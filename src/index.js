import _ from 'lodash';
import * as pkg from '../package.json';
import * as consts from './consts';
import MqttHanlder from './mqtt-handler';
import PubNubHandler from './pubnub-handler';
import PubNubDynamicSubscriber from './pubnub-dynamic-subscriber';

import MediatorSetup from './mqtt-mediator-setup';

import config from './config';
import logger from './logger';

import MessageEnvelope from './networks/message-envelope';
import httpPublisher from './networks/http/http-publisher';

const pubNubHandler = PubNubHandler(config);
const mqttHandler = MqttHanlder(config);
const mqttMediator = MediatorSetup(pubNubHandler);
const pubNubDynSub = PubNubDynamicSubscriber(pubNubHandler);

/**
 * Event fired when MQTT server connection is ready
 */
function onSrvConnect() {
  logger.log('info', 'MQTT connected!');
  _
    .dropRight(config.mqtt.subscribe)
    .forEach((topic) => {
      logger.log('debug', `MQTT subscribe ${topic}`);
      mqttHandler.subscribe(topic);
    });
}

/**
 * Every time a local device send a message this
 * function receives it
 * @param message
 */
function onDeviceMessage(msg) {
  // Handle dynamic subscribe to PubNub based on topic root
  pubNubDynSub.handleTopic(msg.topic);

  mqttMediator.handle(msg);
}

/**
 * Every time a message is received from outside (PubNub)
 *
 * @param msg
 */
function onNetworkMessage(msg) {
  logger.log('info', `PubNub => received ${JSON.stringify(msg)}`);
  if (msg.message.type) {
    if (msg.message.type === 'MQTT') {
      mqttHandler.publish(msg.message.payload.topic, msg.message.payload.value);
    }
  } else {
    logger.log('debug', 'MESSAGE', msg);
  }
}

function onNetworkStatus(status) {
  logger.log('info', `PubNub => status ${JSON.stringify(status)}`);
  if (status.error) {
    logger.log('info', `PubNub error => ${status.category}`);
    if (status.category === 'PNTimeoutCategory') {
      logger.log('info', 'PubNub forcing reconnect');
      pubNubHandler.reconnect();
    }
  }
}

logger.log('info', `Subscribe PubNub channel '${config.pubnub.sub_channel}'`);

// PubNub
pubNubHandler.subscribe(config.pubnub.sub_channel);
pubNubHandler.on(consts.NEVENT_MESSAGE, onNetworkMessage);
pubNubHandler.on(consts.NEVENT_STATUS, onNetworkStatus);

// MQTT
mqttHandler.on(consts.DEVENT_SRV_CONNECT, onSrvConnect);
mqttHandler.on(consts.DEVENT_DEV_MESSAGE, onDeviceMessage);
logger.log('info', 'starting up...');
logger.log('debug', `MQTT subscribe ${_.last(config.mqtt.subscribe)}`);

// Send Gateway info
const envelope = MessageEnvelope(config.gatewayName);
httpPublisher(envelope(consts.EVENT_GATEWAY_INFO,
  {
    version: pkg.version,
    nodejs_version: process.version,
  }),
);

mqttHandler.subscribe(_.last(config.mqtt.subscribe));

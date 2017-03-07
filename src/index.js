'use strict';

import _ from 'lodash';
import * as consts from './consts';
import MqttHanlder from './mqtt-handler';
import PubNubHandler from './pubnub-handler';

import MediatorSetup from './mqtt-mediator-setup';

import config from './config';
import logger from './logger';

const pubNubHandler = PubNubHandler(config);
const mqttHandler = MqttHanlder(config);
const mqttMediator = MediatorSetup(pubNubHandler);

/**
 * Event fired when MQTT server connection is ready
 */
function onSrvConnect() {
	console.log("Connect!");
	_.dropRight(config.mqtt.subscribe)
		.forEach(topic => { logger.log('debug', `MQTT subscribe ${topic}`); mqttHandler.subscribe(topic) });
}

/**
 * Every time a local device (sonoff or other) send a message this
 * function receives it
 * @param message
 */
function onDeviceMessage(msg) {
	mqttMediator.handle(msg);
}

/**
 * Every time a message is received from outside (PubNub)
 *
 * @param msg
 */
function onNetworkMessage(msg) {
	if (msg.message.type) {
		if (msg.message.type === "MQTT") {
			mqttHandler.publish(msg.message.payload.topic, msg.message.payload.value);
		}
	}
	else {
		logger.log('debug', 'MESSAGE', msg);
	}
}

logger.log('info', `Subscribe PubNub channel '${config.pubnub.sub_channel}'`);
pubNubHandler.subscribe(config.pubnub.sub_channel);
pubNubHandler.on(consts.NEVENT_MESSAGE, onNetworkMessage);
mqttHandler.on(consts.DEVENT_SRV_CONNECT, onSrvConnect);
mqttHandler.on(consts.DEVENT_DEV_MESSAGE, onDeviceMessage);
logger.log('info', 'starting up...');
mqttHandler.subscribe(_.last(config.mqtt.subscribe));
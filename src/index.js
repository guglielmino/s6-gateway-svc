'use strict';


import * as consts from './consts';
import MqttHanlder from './mqtt-handler';
import PubNubHandler from './pubnub-handler';
import MQTTHub from './hubs/mqtt-hub';
import MQTTBridge from './mqtt-bridge';
import config from './config';
import logger from './logger';


/**
 * Event fired when MQTT server connection is ready
 */
function onSrvConnect() {
	console.log("Connect!");
	mqttHandler.subscribe('cmnd/#');
	mqttHandler.subscribe('stat/#');
}

/**
 * Every time a local device (sonoff or other) send a message this
 * function receive it
 * @param message
 */
function onDeviceMessage(msg) {
	mqttHub.handleMsg(msg);
}

/**
 * Every time a message is received from nettwork (pubnum)
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

const pubNubHandler = PubNubHandler(config);
const mqttHandler = MqttHanlder(config);

let pubNubPublish = function(channel) {
	return function(message) {
		return pubNubHandler.publish(channel, message);
	}
};

const handlers = MQTTBridge(pubNubPublish(config.pubnub.channel));
const mqttHub = MQTTHub(handlers);

logger.log('info', 'starting up...');
logger.log('info', `PubNub channel ${config.pubnub.channel}`);
pubNubHandler.subscribe(config.pubnub.channel);
pubNubHandler.on(consts.NEVENT_MESSAGE, onNetworkMessage);

mqttHandler.on(consts.DEVENT_SRV_CONNECT, onSrvConnect);
mqttHandler.on(consts.DEVENT_DEV_MESSAGE, onDeviceMessage);
mqttHandler.subscribe('tele/#');
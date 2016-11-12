'use strict';


import * as consts from './consts';
import MqttHanlder from './mqtt-handler';
import PubNubHandler from './pubnub-handler';
import config from './config';
import logger from './logger';

/**
 * Event fired when MQTT server connection is ready
 */
function onSrvConnect() {
	console.log("Connect!");
	mqttHandler.subscribe('cmnd/#');
}

/**
 * Every time a local device (sonoff or other) send a message this
 * function receive it
 * @param message
 */
function onDeviceMessage(msg) {

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


logger.log('info', 'starting up...');
pubNubHandler.subscribe('commands');
pubNubHandler.on(consts.NEVENT_MESSAGE, onNetworkMessage);

mqttHandler.subscribe('test/topic');
mqttHandler.on(consts.DEVENT_SRV_CONNECT, onSrvConnect);
mqttHandler.on(consts.DEVENT_DEV_MESSAGE, onDeviceMessage);

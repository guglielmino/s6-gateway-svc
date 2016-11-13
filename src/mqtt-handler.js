'use strict';

import mqtt from 'mqtt';
import logger from './logger';
import * as consts from './consts';
const EventEmitter = require('events').EventEmitter;

export default function(config) {
	const client = mqtt.connect(config.mqtt.url);
	const eventEmitter = new EventEmitter();

	logger.log('info', `starting MQTT on ${config.mqtt.url}`);
	client.on('connect', function () {
		logger.log('debug', 'connect');
		eventEmitter.emit(consts.DEVENT_SRV_CONNECT);
	});

	client.on('message', function (topic, message) {
		logger.log('debug', 'message', { topic, message });
		eventEmitter.emit(consts.DEVENT_DEV_MESSAGE, { topic: topic, message: message.toString() });
	});

	return {
		subscribe(topic)  {
			client.subscribe(topic);
		},
		unsubscribe(topic) {
			client.unsubscribe(topic);
		},
		publish(topic, value) {
			client.publish(topic, value);
		},
		stop() {
			client.end();
		},
		on(key, fn) {
			eventEmitter.on(key, fn);
		}
	}
}
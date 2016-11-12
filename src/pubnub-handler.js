'use strict';
import PubNub from 'pubnub';
import logger from './logger';
import * as consts from './consts';
const EventEmitter = require('events').EventEmitter;


export default function (config) {
	const eventEmitter = new EventEmitter();
	const pubnub = new PubNub({
		ssl: true,  // <- enable TLS Tunneling over TCP
		logVerbosity: false,
		publishKey: config.pubnub.publishKey,
		subscribeKey: config.pubnub.subscribeKey
	});

	logger.log('info', 'starting PubNub');
	pubnub.addListener({
		status: function (statusEvent) {
			eventEmitter.emit(consts.NEVENT_STATUS, statusEvent);
		},
		message: function (msg) {
			eventEmitter.emit(consts.NEVENT_MESSAGE, msg);
		},
		presence: function (presenceEvent) {
			eventEmitter.emit(consts.NEVENT_PRESENCE, msg);
		}
	});

	return {
		publish: (channel, payload) => {
			pubnub.publish({
				channel: channel,
				message: payload,
				callback: function (e) {
					logger.log('success', e);
				},
				error: function (e) {
					logger.log('error', e);
				}
			});
		},
		subscribe: (channel) => {
			pubnub.subscribe({
				channels: [channel],
				withPresence: false
			});
		},
		on(event, fn) {
			eventEmitter.on(event, fn);
		}
	}

}
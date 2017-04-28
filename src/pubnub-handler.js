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
    subscribeKey: config.pubnub.subscribeKey,
    heartbeatInterval: config.pubnub.heartbeatInterval,
  });

  logger.log('info', 'starting PubNub');
  pubnub.addListener({
    status(statusEvent) {
      eventEmitter.emit(consts.NEVENT_STATUS, statusEvent);
    },
    message(msg) {
      eventEmitter.emit(consts.NEVENT_MESSAGE, msg);
    },
    presence(presenceEvent) {
      eventEmitter.emit(consts.NEVENT_PRESENCE, presenceEvent);
    },
  });

  return {
    publish: (channel, payload) => {
      pubnub.publish({
        channel,
        message: payload,
        callback(e) {
          logger.log('success', e);
        },
        error(e) {
          logger.log('error', e);
        },
      });
    },
    subscribe: (channel) => {
      pubnub.subscribe({
        channels: [channel],
        withPresence: false,
      });
    },
    unsubsribe: (channel) => {
      pubnub.unsubscribe({
        channels: [channel],
      });
    },
    on(event, fn) {
      eventEmitter.on(event, fn);
    },
  };
}

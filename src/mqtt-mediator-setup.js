'use strict';

import config from './config';
import logger from './logger';
import * as consts from './consts';
import EventsMediator from './networks/devices/events-mediator';
import PubNubCommand from './commands/pubnub-command';

import TelemetryTranslator from './translators/TelemetryTranslator';
import ResultTranslator from './translators/ResultTranslator';

const MediatorSetup = (pubNubHandler) => {
	const mqttMediator = EventsMediator();

	let pubNubPublish = function(channel) {
		return function(message) {
			return pubNubHandler.publish(channel, message);
		}
	};

	const pnPublisher = pubNubPublish(config.pubnub.pub_channel);

	mqttMediator.addHandler(/^stat\/.*\/INFO$/, (msg) => console.log(`MSG => ${JSON.stringify(msg)}`));
	mqttMediator.addHandler( /^tele\/.*\/RESULT$/, (msg) => {
		const value = ResultTranslator(msg);
		if (value) {
			pnPublisher(PubNubCommand(consts.EVENT_INFO, value));
		}
	});
	mqttMediator.addHandler(/^tele\/.*\/TELEMETRY$/, (msg)  => {
		const value = TelemetryTranslator(msg);
		if (value) {
			pnPublisher(PubNubCommand(consts.EVENT_ENERGY, value));
		}
	});

	return mqttMediator;
};

export default MediatorSetup;
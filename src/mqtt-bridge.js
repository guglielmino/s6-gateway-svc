'use strict';

import logger from './logger';
import * as consts from './consts';
import PubNubCommand from './commands/pubnub-command';


import TelemetryTranslator from './translators/TelemetryTranslator';
import ResultTranslator from './translators/ResultTranslator';
/**
 * Bridge commands received from MQTT broker to web dashboard publishing them with
 * publisher function passed from the caller
 * @param publisher
 * @returns {[*,*,*]}
 */
export default function(publisher) {

	return  [
		{
			pattern: /^stat\/.*\/INFO$/, fn: (msg) => publisher(PubNubCommand(consts.CMD_INFO, msg.message))
		},
		{
			pattern: /^stat\/.*\/RESULT$/, fn: (msg) => {
				const value = ResultTranslator(msg);
				if (value) {
					publisher(PubNubCommand(consts.CMD_INFO, value));
				}
			}
		},
		{
			pattern: /^tele\/.*\/TELEMETRY$/, fn: (msg)  => {
				const value = TelemetryTranslator(msg);
				if (value) {
					publisher(PubNubCommand(consts.CMD_ENERGY, value));
				}
			}
		}
	];
}
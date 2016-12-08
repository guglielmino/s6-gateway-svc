'use strict';

import Consumption from './commands/consumption';

/**
 * Bridge commands received from MQTT broker to web dashboard publishing them with
 * publisher function passed from the caller
 * @param publisher
 * @returns {[*,*,*]}
 */
export default function(publisher) {

	return  [
		{
			pattern: /^stat\/.*\/POWER$/, fn: (msg) => publisher(Consumption(msg.topic, msg.message))
		},
		{
			pattern: /^tele\/.*\/VOLTAGE$/, fn: (msg) => console.log(`VOLTAGE ${msg}`)
		},
		{
			pattern: /^tele\/.*\/CURRENT/, fn: (msg) => console.log(`CURRENT ${msg}`)
		}
	];
}
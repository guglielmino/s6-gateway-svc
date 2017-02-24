'use strict';

import logger from '../logger';

/**
 * Decode and dispatch MQTT event to right handler
 * @param msg
 */
export default function (handlers) {

	return {
		handleMsg(msg) {

			if (msg.topic) {
				let matching = handlers.filter((item) => item.pattern.test(msg.topic));
				matching.forEach(handler => handler.fn(msg));
			}
		}
	}
}



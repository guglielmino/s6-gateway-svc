'use strict';

import * as consts from '../consts';

export default function (topic, value) {
	console.log(`Consumption ${topic} - ${value}`);
	return {
		type: consts.CMD_CONSUMPTION,
		payload: {
			device_id: topic,
			value: value
		}
	};
}


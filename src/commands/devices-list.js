'use strict';

import * as consts from '../consts';

export default function(devices) {
	return  {
		type: consts.CMD_DEVICE_LIST,
		payload: {
			devices: devices
		}
	};
}
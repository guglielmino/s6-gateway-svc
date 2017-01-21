'use strict';

import config from '../config';
import * as consts from '../consts';
import logger from '../logger';

export default function (type, value) {
	return { GatewayId: config.gatewayName, Type: type, Payload: value};
}


'use strict';

import config from '../config';
import * as consts from '../consts';
import logger from '../logger';

export default function (type, value) {
	logger.log('info', `CMD -- ${type} - ${JSON.stringify(value)}`);
	return { GatewayId: config.gatewayName, Type: type, Payload: value};
}


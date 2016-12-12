'use strict';

import * as consts from '../consts';
import logger from '../logger';

export default function (type, value) {
	logger.log('info', `CMD -- ${type} - ${value}`);
	return {
		type: type,
		payload: value
	};
}


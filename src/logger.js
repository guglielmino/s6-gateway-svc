'use strict';

import path from 'path';
const winston = require('winston');

function logger()  {
	const filename = path.join(__dirname, 'application.log');
	const logger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({level: 'debug' }),
			new (winston.transports.File)({ filename: filename, level: 'debug' })
		]
	});

	return {

		log: (level, message, payload = {}) => {
			logger.log(level, message, payload);
		}
	}
}

module.exports = logger();

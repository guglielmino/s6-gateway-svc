import config from './config';

const winston = require('winston');

function logger() {
  const filename = config.logger.path;
  const wlogger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: config.logger.level }),
      new (winston.transports.File)({ filename, level: config.logger.level }),
    ],
  });

  return {
    log: (level, message, payload = {}) => {
      wlogger.log(level, message, payload);
    },
  };
}

module.exports = logger();

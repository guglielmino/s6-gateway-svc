import path from 'path';

const winston = require('winston');

function logger() {
  const filename = path.join(__dirname, 'application.log');
  const wlogger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'verbose' }),
      new (winston.transports.File)({ filename, level: 'verbose' }),
    ],
  });

  return {
    log: (level, message, payload = {}) => {
      wlogger.log(level, message, payload);
    },
  };
}

module.exports = logger();

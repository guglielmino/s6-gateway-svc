import path from 'path';

const winston = require('winston');

function logger() {
  const filename = path.join(__dirname, 'application.log');
  const wlogger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'info' }),
      new (winston.transports.File)({ filename, level: 'info' }),
    ],
  });

  return {
    log: (level, message, payload = {}) => {
      wlogger.log(level, message, payload);
    },
  };
}

module.exports = logger();

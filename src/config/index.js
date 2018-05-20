require('dotenv').config();

[
  'PUBNUB_SKEY',
  'MQTT_URL',
  'GATEWAY_NAME',
  'API_URL',
  'API_KEY',
].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  gatewayName: process.env.GATEWAY_NAME,
  mqtt: {
    url: process.env.MQTT_URL || 'mqtt://127.0.0.1',
    subscribe: [
      '+/+/sensors/+/+',
      '+/+/events/+/+'],
  },
  pubnub: {
    subscribeKey: process.env.PUBNUB_SKEY,
    sub_channel: process.env.GATEWAY_NAME,
    heartbeatInterval: process.env.PUBNUB_HB_INTERVAL || 20,
  },
  api: {
    url: process.env.API_URL,
    key: process.env.API_KEY,
  },
  logger: {
    level: process.env.LOG_LEVEL || 'debug',
    path: process.env.LOG_PATH || `${__dirname}/../app.log`,
  },
};

export default config;

require('dotenv').config();

[
  'PUBNUB_PUB_CHANNEL',
  'PUBNUB_SUB_CHANNEL',
  'PUBNUB_PKEY',
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
      'cmnd/#',
      'stat/#',
      'tele/#',
      'building/+/sensors/+/+',
      'building/+/events/+/+'],
  },
  pubnub: {
    publishKey: process.env.PUBNUB_PKEY,
    subscribeKey: process.env.PUBNUB_SKEY,
    pub_channel: process.env.PUBNUB_PUB_CHANNEL,
    sub_channel: process.env.PUBNUB_SUB_CHANNEL || this.gatewayName,
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

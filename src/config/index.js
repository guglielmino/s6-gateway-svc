require('dotenv').config();

[
  'PUBNUB_PUB_CHANNEL',
  'PUBNUB_PKEY',
  'PUBNUB_SKEY',
  'MQTT_URL',
  'GATEWAY_NAME',
  'API_URL',
].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  gatewayName: process.env.GATEWAY_NAME,
  mqtt: {
    url: process.env.MQTT_URL || 'mqtt://127.0.0.1',
    subscribe: ['cmnd/#', 'stat/#', 'tele/#'],
  },
  pubnub: {
    publishKey: process.env.PUBNUB_PKEY,
    subscribeKey: process.env.PUBNUB_SKEY,
    pub_channel: process.env.PUBNUB_PUB_CHANNEL,
    sub_channel: process.env.PUBNUB_SUB_CHANNEL || this.gatewayName,
  },
  api: {
    url: process.env.API_URL,
  },
};

export default config;

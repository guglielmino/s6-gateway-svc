'use strict';

require('dotenv').config();
[
    'PUBNUB_PUB_CHANNEL',
    'PUBNUB_PKEY',
    'PUBNUB_SKEY',
	'MQTT_URL',
	'GATEWAY_NAME'
].forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`)
    }
});

let config = {
	gatewayName: process.env.GATEWAY_NAME,
	mqtt: {
		url: process.env.MQTT_URL,
		subscribe: ['cmnd/#', 'stat/#', 'tele/#']
	},
	pubnub: {
		publishKey: process.env.PUBNUB_PKEY,
		subscribeKey: process.env.PUBNUB_SKEY,
		pub_channel: process.env.PUBNUB_PUB_CHANNEL,
		sub_channel: process.env.PUBNUB_SUB_CHANNEL || config.gatewayName
	}
}

export default config;
let config = {
	mqtt: {
		url: process.env.MQTT_URL || 'mqtt://127.0.0.1'
	},
	pubnub: {
		publishKey: process.env.PUBNUB_PKEY || "pub-c-1e94a42c-af1d-432f-acc6-df8b5f64c22f",
		subscribeKey: process.env.PUBNUB_SKEY ||"sub-c-58b8b736-a785-11e6-85a3-02ee2ddab7fe"
	}
}

export default config;
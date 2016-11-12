import config from './config';

import mqtt from 'mqtt';
import PubNub from 'pubnub';

const client = mqtt.connect(config.mqtt_url);
const ws = new WebSocket(config.websocket_url);


// -- PubNub
const pubnub = new PubNub({
	ssl: true,  // <- enable TLS Tunneling over TCP
	logVerbosity: true,
	publishKey: "pub-c-1e94a42c-af1d-432f-acc6-df8b5f64c22f",
	subscribeKey: "sub-c-58b8b736-a785-11e6-85a3-02ee2ddab7fe"
});

pubnub.addListener({
	status: function (statusEvent) {
		/*if (statusEvent.category === "PNConnectedCategory") {
			console.log("CONNECTED");
		}
		console.log(`status ${JSON.stringify(statusEvent)}`);*/
	},
	message: function (msg) {
		//console.log("MESSAGE :", JSON.stringify(message));
		if(msg.message.type) {

			if(msg.message.type === "MQTT"){
				console.log(`Eseguo ${msg.message.payload.topic}=>${msg.message.payload.value}`);
				client.publish(msg.message.payload.topic, msg.message.payload.value);
			}

		}

	},
	presence: function (presenceEvent) {
	//	console.log(`presence ${JSON.stringify(presenceEvent)}`);
	}
});

console.log("Subscribing..");

pubnub.subscribe({
	channels: ['commands'],
	withPresence: false
});

// -- PubNub

// -- MQTT
client.on('connect', function () {
	client.subscribe('test/action')

});

client.on('message', function (topic, message) {
	// message is Buffer
	console.log(`topic ${topic} => ${message}`);
	ws.send(JSON.stringify({ topic: topic, message: message.toString() }), (error) => {
		if (error) {
			console.log(error);
		}
	});
	//client.end()
});

// -- MQTT

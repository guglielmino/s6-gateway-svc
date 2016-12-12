'use strict'

export default function(msg) {
	const telemetryMessage = JSON.parse(msg.message);
	if(telemetryMessage.Energy) {
		return Object.assign({}, {Topic: msg.topic }, telemetryMessage.Energy, {Time:  telemetryMessage.Time});
	}
	return null;
}
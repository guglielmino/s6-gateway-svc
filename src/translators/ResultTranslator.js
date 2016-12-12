/**
 {"level":"debug","message":"MQTT message {\"topic\":\"stat/sonoff/RESULT\",\"message\":\"{\\\"Info1\\\":{\\\"AppName\\\":\\\"Sonoff Pow module\\\", \\\"Version\\\":\\\"3.0.2\\\", \\\"FallbackTopic\\\":\\\"DVES_20D9AC\\\", \\\"GroupTopic\\\":\\\"pows\\\"}}\"}","timestamp":"2016-12-10T13:14:36.823Z"}
*/


export default function(msg) {
	const resultMessage = JSON.parse(msg.message);
	if(resultMessage.Info1) {
		return Object.assign({}, { Topic: msg.topic}, resultMessage.Info1);
	}
	return null;
}
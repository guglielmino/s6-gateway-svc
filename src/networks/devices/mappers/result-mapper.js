export default function(msg) {
	const resultMessage = JSON.parse(msg.message);
	if(resultMessage.Info1) {
		return Object.assign({}, { Topic: msg.topic}, resultMessage.Info1);
	}
	return null;
};
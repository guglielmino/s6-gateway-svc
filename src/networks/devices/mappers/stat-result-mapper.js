export default function (msg) {
  const resultMessage = JSON.parse(msg.message);
  if (resultMessage.POWER) {
    return Object.assign({}, { Topic: msg.topic }, { Power: resultMessage.POWER });
  }
  return null;
}

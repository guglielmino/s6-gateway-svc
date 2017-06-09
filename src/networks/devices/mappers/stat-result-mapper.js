export default function (msg) {
  const resultMessage = JSON.parse(msg.message);
  if (resultMessage.POWER) {
    return { Topic: msg.topic, Power: resultMessage.POWER, DeviceId: resultMessage.DeviceId };
  }
  return null;
}

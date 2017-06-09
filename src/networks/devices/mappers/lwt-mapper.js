export default function (msg) {
  const resultMessage = JSON.parse(msg.message);
  if (resultMessage.Status) {
    return { Topic: msg.topic, Status: resultMessage.Status, DeviceId: resultMessage.DeviceId };
  }
  return null;
}

export default function (msg) {
  try {
    const resultMessage = JSON.parse(msg.message);
    if (resultMessage.Status) {
      return { Topic: msg.topic, Status: resultMessage.Status, DeviceId: resultMessage.DeviceId };
    }
  } catch (e) {  // eslint-disable-lint  no-empty

  }

  return null;
}

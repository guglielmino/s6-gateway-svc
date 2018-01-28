import { TopicToDeviceId } from './topic-helper';

export default function (msg) {
  try {
    const deviceId = TopicToDeviceId(msg.topic);
    const resultMessage = JSON.parse(msg.message);
    if (deviceId && resultMessage.appName) {
      return { topic: msg.topic, deviceId, ...resultMessage };
    }
  } catch (e) {  // eslint-disable-lint  no-empty

  }

  return null;
}
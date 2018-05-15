import { TopicToDeviceId } from '../topic-helper';
import logger from '../../../logger';

const wrapIfArray = message => (Array.isArray(message) ? { items: message } : message);

export default function (msg) {
  try {
    const deviceId = TopicToDeviceId(msg.topic);
    const resultMessage = JSON.parse(msg.message);
    if (deviceId) {
      return { topic: msg.topic, deviceId, ...wrapIfArray(resultMessage) };
    }
  } catch (e) {  // eslint-disable-lint  no-empty
    logger.log('debug', e);
  }

  return null;
}

import MessageEnvelope from '../../../message-envelope';
import * as consts from '../../../../consts';
import S6PowerFeedbackMapper from '../mappers/power-feedback-mapper';

export default publisher => (msg) => {
  const value = S6PowerFeedbackMapper(msg);
  if (value) {
    publisher(MessageEnvelope(consts.EVENT_S6_POWER_FEED_BACK, value));
  }
};

import * as consts from '../../../../consts';
import S6PowerFeedbackMapper from '../mappers/power-feedback-mapper';

export default ({ publisher, envelope }) => (msg) => {
  const value = S6PowerFeedbackMapper(msg);
  if (value) {
    publisher(envelope(consts.EVENT_S6_POWER_FEED_BACK, value));
  }
};

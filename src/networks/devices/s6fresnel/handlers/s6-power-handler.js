import MessageEnvelope from '../../../message-envelope';
import * as consts from '../../../../consts';
import S6PowerConsumeMapper from '../mappers/power-consume-mapper';

export default publisher => (msg) => {
  const value = S6PowerConsumeMapper(msg);
  if (value) {
    publisher(MessageEnvelope(consts.EVENT_S6_POWER_CONSUME, value));
  }
};

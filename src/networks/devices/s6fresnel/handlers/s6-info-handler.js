import MessageEnvelope from '../../../message-envelope';
import * as consts from '../../../../consts';
import S6InfoMapper from '../mappers/info-mapper';

export default publisher => (msg) => {
  const value = S6InfoMapper(msg);
  if (value) {
    publisher(MessageEnvelope(consts.EVENT_S6_INFO_CONSUME, value));
  }
};

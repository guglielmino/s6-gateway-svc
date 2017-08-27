import MessageEnvelope from '../../../message-envelope';
import * as consts from '../../../../consts';
import S6LWTMapper from '../mappers/lwt-mapper';

export default publisher => (msg) => {
  const value = S6LWTMapper(msg);
  if (value) {
    publisher(MessageEnvelope(consts.EVENT_S6_LWT, value));
  }
};

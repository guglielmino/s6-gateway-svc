import MessageEnvelope from '../../../message-envelope';
import LwtMapper from '../mappers/lwt-mapper';
import * as consts from '../../../../consts';

/**
 * Handles LWT messages coming from Sonoff devices
 * @param publisher
 */
export default publisher => (msg) => {
  const value = LwtMapper(msg);
  if (value) {
    publisher(MessageEnvelope(consts.EVENT_LWT, value));
  }
};

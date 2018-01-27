import LwtMapper from '../mappers/lwt-mapper';
import * as consts from '../../../../consts';

/**
 * Handles LWT messages coming from Sonoff devices
 * @param publisher
 */
export default ({ publisher, envelope }) => (msg) => {
  const value = LwtMapper(msg);
  if (value) {
    publisher(envelope(consts.EVENT_LWT, value));
  }
};

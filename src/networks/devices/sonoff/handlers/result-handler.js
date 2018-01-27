import ResultMapper from '../mappers/result-mapper';
import * as consts from '../../../../consts';

/**
 * Handles Info1 message coming from Sonoff Pow Devices
 * @param publisher
 */
export default ({ publisher, envelope }) => (msg) => {
  const value = ResultMapper(msg);
  if (value) {
    publisher(envelope(consts.EVENT_INFO, value));
  }
};

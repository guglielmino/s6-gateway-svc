import StatResultMapper from '../mappers/stat-result-mapper';
import * as consts from '../../../../consts';

/**
 * Handles Power feedback message coming from Sonoff devices
 * @param publisher
 */
export default ({ publisher, envelope }) => (msg) => {
  const value = StatResultMapper(msg);
  if (value) {
    publisher(envelope(consts.EVENT_POWER_STATUS, value));
  }
};

import PubNubCommand from '../../../../commands/pubnub-command';
import StatResultMapper from '../mappers/stat-result-mapper';
import * as consts from '../../../../consts';

/**
 * Handles Power feedback message coming from Sonoff devices
 * @param publisher
 */
export default publisher => (msg) => {
  const value = StatResultMapper(msg);
  if (value) {
    publisher(PubNubCommand(consts.EVENT_POWER_STATUS, value));
  }
};

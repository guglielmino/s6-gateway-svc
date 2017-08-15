import PubNubCommand from '../../../../commands/pubnub-command';
import LwtMapper from '../mappers/lwt-mapper';
import * as consts from '../../../../consts';

/**
 * Handles LWT messages coming from Sonoff devices
 * @param publisher
 */
export default publisher => (msg) => {
  const value = LwtMapper(msg);
  if (value) {
    publisher(PubNubCommand(consts.EVENT_LWT, value));
  }
};

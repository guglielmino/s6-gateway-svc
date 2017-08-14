import PubNubCommand from '../../../../commands/pubnub-command';
import LwtMapper from '../mappers/lwt-mapper';
import * as consts from '../../../../consts';

export default publisher => (topic, msg) => {
  const value = LwtMapper(msg);
  if (value) {
    publisher(PubNubCommand(consts.EVENT_LWT, value));
  }
};

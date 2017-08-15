import PubNubCommand from '../../../../commands/pubnub-command';
import * as consts from '../../../../consts';
import S6PowerConsumeMapper from '../mappers/power-consume-mapper';

export default publisher => (topic, msg) => {
  const value = S6PowerConsumeMapper(msg);
  if (value) {
    publisher(PubNubCommand(consts.EVENT_S6_POWER_CONSUME, value));
  }
};

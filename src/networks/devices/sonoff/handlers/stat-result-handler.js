import PubNubCommand from '../../../commands/pubnub-command';
import StatResultMapper from '../mappers/stat-result-mapper';
import * as consts from '../../../consts';

export default publisher => (topic, msg) => {
  const value = StatResultMapper(msg);
  if (value) {
    publisher(PubNubCommand(consts.EVENT_POWER_STATUS, value));
  }
};

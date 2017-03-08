import PubNubCommand from '../../../commands/pubnub-command';
import ResultMapper from '../mappers/result-mapper';
import * as consts from '../../../consts';

export default publisher => (msg) => {
  const value = ResultMapper(msg);
  if (value) {
    publisher(PubNubCommand(consts.EVENT_INFO, value));
  }
};

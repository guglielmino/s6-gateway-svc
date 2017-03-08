import PubNubCommand from '../../../commands/pubnub-command';
import TelemetryMapper from '../mappers/telemetry-mapper';
import * as consts from '../../../consts';

export default publisher => (msg) => {
  const value = TelemetryMapper(msg);
  if (value) {
    publisher(PubNubCommand(consts.EVENT_ENERGY, value));
  }
};


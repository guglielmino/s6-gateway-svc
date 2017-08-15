import PubNubCommand from '../../../../commands/pubnub-command';
import TelemetryMapper from '../mappers/telemetry-mapper';
import * as consts from '../../../../consts';

/**
 * Handles power consumption telemetry data coming from Sonoff devices
 * @param publisher
 */
export default publisher => (topic, msg) => {
  const value = TelemetryMapper(msg);
  if (value) {
    publisher(PubNubCommand(consts.EVENT_ENERGY, value));
  }
};


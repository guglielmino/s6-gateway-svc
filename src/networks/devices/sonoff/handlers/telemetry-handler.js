import MessageEnvelope from '../../../message-envelope';
import TelemetryMapper from '../mappers/telemetry-mapper';
import * as consts from '../../../../consts';

/**
 * Handles power consumption telemetry data coming from Sonoff devices
 * @param publisher
 */
export default publisher => (msg) => {
  const value = TelemetryMapper(msg);
  if (value) {
    publisher(MessageEnvelope(consts.EVENT_ENERGY, value));
  }
};


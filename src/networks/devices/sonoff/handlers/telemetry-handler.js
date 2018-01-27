import TelemetryMapper from '../mappers/telemetry-mapper';
import * as consts from '../../../../consts';

/**
 * Handles power consumption telemetry data coming from Sonoff devices
 * @param publisher
 */
export default ({ publisher, envelope }) => (msg) => {
  const value = TelemetryMapper(msg);
  if (value) {
    publisher(envelope(consts.EVENT_ENERGY, value));
  }
};


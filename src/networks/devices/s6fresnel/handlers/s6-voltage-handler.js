import * as consts from '../../../../consts';
import S6SensorDataMapper from '../mappers/sensor-data-mapper';

export default ({ publisher, envelope }) => (msg) => {
  const value = S6SensorDataMapper(msg);
  if (value) {
    publisher(envelope(consts.EVENT_S6_VOLTAGE, value));
  }
};

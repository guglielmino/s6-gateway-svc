import MessageEnvelope from '../../../message-envelope';
import * as consts from '../../../../consts';
import S6SensorDataMapper from '../mappers/sensor-data-mapper';

export default publisher => (msg) => {
  const value = S6SensorDataMapper(msg);
  if (value) {
    publisher(MessageEnvelope(consts.EVENT_S6_FREQUENCY, value));
  }
};

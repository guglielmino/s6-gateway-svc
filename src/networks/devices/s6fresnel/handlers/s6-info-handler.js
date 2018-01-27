import * as consts from '../../../../consts';
import S6InfoMapper from '../mappers/info-mapper';

export default ({ publisher, envelope }) => (msg) => {
  const value = S6InfoMapper(msg);
  if (value) {
    publisher(envelope(consts.EVENT_S6_INFO_CONSUME, value));
  }
};

import * as consts from '../../../../consts';
import S6LWTMapper from '../mappers/lwt-mapper';

export default ({ publisher, envelope }) => (msg) => {
  const value = S6LWTMapper(msg);
  if (value) {
    publisher(envelope(consts.EVENT_S6_LWT, value));
  }
};

import * as consts from '../consts';

export default gatewayName => (gateway, type, value) => ({
  GatewayId: gateway === consts.ROOT_TOPIC_LOCAL || gateway === consts.ROOT_TOPIC_LEGACY ?
    gatewayName : gateway,
  Type: type,
  Payload: value,
});


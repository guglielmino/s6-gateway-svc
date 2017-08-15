import config from '../config/index';

export default function (type, value) {
  return { GatewayId: config.gatewayName, Type: type, Payload: value };
}

import config from '../config';

export default function (type, value) {
  return { GatewayId: config.gatewayName, Type: type, Payload: value };
}

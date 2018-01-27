export default gatewayName => (type, value) => ({
  GatewayId: gatewayName, Type: type, Payload: value,
});


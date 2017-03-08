export default function (msg) {
  const telemetryMessage = JSON.parse(msg.message);
  if (telemetryMessage.Energy) {
    return Object.assign({}, { DeviceId: msg.topic },
      telemetryMessage.Energy, { Time: telemetryMessage.Time });
  }
  return null;
}

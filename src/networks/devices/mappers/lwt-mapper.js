export default function (msg) {
  if (msg.message) {
    return Object.assign({}, { Topic: msg.topic }, { Status: msg.message });
  }
  return null;
}

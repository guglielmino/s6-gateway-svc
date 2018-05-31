import mqtt from 'mqtt';
import config from '../../config';

const MqttPublisher = () => {
  const client = mqtt.connect(config.mqtt.url);
  return (topic, payload) => client.publish(topic, payload);
};

export default MqttPublisher;

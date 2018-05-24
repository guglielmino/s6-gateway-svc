import config from './config';

import EventsMediator from './networks/devices/events-mediator';
import MessageEnvelope from './networks/message-envelope';

import { HandlerFactory } from './networks/handler/handler-factory';

import httpPublisher from './networks/http/http-publisher';
import MqttPublisher from './networks/mqtt/mqtt-pubisher';

import OTACommit from './networks/devices/mqtt-payloads/ota-commit';
import DevicePayloadapper from './networks/devices/mappers/payload-mapper';

// TODO: refactor for testing (as in server code)
const MediatorSetup = () => {
  const mqttMediator = EventsMediator();

  const envelope = MessageEnvelope(config.gatewayName);
  const mqttPublisher = MqttPublisher();
  const httpTopicPublisherHandler = HandlerFactory({ publisher: httpPublisher, envelope });

  // Handle IoT messages (consumprion, temperature, IO events, ...)
  mqttMediator.addHandler(/.*\/.*\/(?:sensors|events)\/.*\/*./,
    httpTopicPublisherHandler({
      mapper: DevicePayloadapper,
    }));

  // Handle OTA feedback
  mqttMediator.addHandler(/local\/update\/feedback\/rpc/,
    (msg) => {
      const payload = JSON.parse(msg.message);
      if (payload.error.code === 0) {
        mqttPublisher(`${payload.src}/rpc`, JSON.stringify(OTACommit));
      }
    },
  );

  return mqttMediator;
};

export default MediatorSetup;

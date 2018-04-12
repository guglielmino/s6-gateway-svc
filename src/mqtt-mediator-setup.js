import config from './config';

import EventsMediator from './networks/devices/events-mediator';
import MessageEnvelope from './networks/message-envelope';

import { HandlerFactory } from './networks/handler/handler-factory';

import httpPublisher from './networks/http/http-publisher';

import DevicePayloadapper from './networks/devices/mappers/payload-mapper';

// TODO: refactor for testing (as in server code)
const MediatorSetup = () => {
  const mqttMediator = EventsMediator();

  const envelope = MessageEnvelope(config.gatewayName);
  const httpTopicPublisherHandler = HandlerFactory({ publisher: httpPublisher, envelope });

  mqttMediator.addHandler(/.*\/.*\/(?:sensors|events)\/.*\/*./,
    httpTopicPublisherHandler({
      mapper: DevicePayloadapper,
    }));

  return mqttMediator;
};

export default MediatorSetup;

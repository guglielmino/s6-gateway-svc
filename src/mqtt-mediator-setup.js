import config from './config';
import EventsMediator from './networks/devices/events-mediator';

import ResultHandler from './networks/devices/handlers/result-handler';
import TelemetryHandler from './networks/devices/handlers/telemetry-handler';
import StatResultHandler from './networks/devices/handlers/stat-result-handler';
import LwtHandler from './networks/devices/handlers/lwt-handler';


import RestClient from './networks/http/rest-client';

const MediatorSetup = (pubNubHandler) => {
  const mqttMediator = EventsMediator();

  const pubNubPublish = channel => message => pubNubHandler.publish(channel, message);

  const pnPublisher = pubNubPublish(config.pubnub.pub_channel);

  const httpPublisher = payload => RestClient().post(`${config.api.url}events/`, payload);

  mqttMediator.addHandler(/^stat\/.*\/RESULT$/, StatResultHandler(httpPublisher));
  mqttMediator.addHandler(/^tele\/.*\/RESULT$/, ResultHandler(pnPublisher));
  mqttMediator.addHandler(/^tele\/.*\/TELEMETRY$/, TelemetryHandler(pnPublisher));
  mqttMediator.addHandler(/^tele\/.*\/LWT$/, LwtHandler(httpPublisher));

  return mqttMediator;
};

export default MediatorSetup;

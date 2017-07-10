import config from './config';
import EventsMediator from './networks/devices/events-mediator';

import StatResultHandler from './networks/devices/handlers/stat-result-handler';
import LwtHandler from './networks/devices/handlers/lwt-handler';
import TelemetryHandler from './networks/devices/handlers/telemetry-handler';
import ResultHandler from './networks/devices/handlers/result-handler';


import RestClient from './networks/http/rest-client';

const MediatorSetup = () => {
  const mqttMediator = EventsMediator();

  const httpPublisher = payload => RestClient().post(`${config.api.url}events/`, payload);

  mqttMediator.addHandler(/^tele\/.*\/RESULT$/, ResultHandler(httpPublisher));
  mqttMediator.addHandler(/^stat\/.*\/RESULT$/, StatResultHandler(httpPublisher));
  mqttMediator.addHandler(/^tele\/.*\/LWT$/, LwtHandler(httpPublisher));
  mqttMediator.addHandler(/^tele\/.*\/TELEMETRY$/, TelemetryHandler(httpPublisher));

  return mqttMediator;
};

export default MediatorSetup;

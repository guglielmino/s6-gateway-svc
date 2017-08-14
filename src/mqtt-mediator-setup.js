import config from './config';
import EventsMediator from './networks/devices/events-mediator';

import StatResultHandler from './networks/devices/sonoff/handlers/stat-result-handler';
import LwtHandler from './networks/devices/sonoff/handlers/lwt-handler';
import TelemetryHandler from './networks/devices/sonoff/handlers/telemetry-handler';
import ResultHandler from './networks/devices/sonoff/handlers/result-handler';
// S6 Fresnel Handler
import S6PowerConsumeHandler from './networks/devices/s6fresnel/handlers/s6-power-handler';


import RestClient from './networks/http/rest-client';

const MediatorSetup = () => {
  const mqttMediator = EventsMediator();

  const httpPublisher = payload => RestClient().post(`${config.api.url}events/`, payload);

  mqttMediator.addHandler(/^tele\/.*\/RESULT$/, ResultHandler(httpPublisher));
  mqttMediator.addHandler(/^stat\/.*\/RESULT$/, StatResultHandler(httpPublisher));
  mqttMediator.addHandler(/^tele\/.*\/LWT$/, LwtHandler(httpPublisher));
  mqttMediator.addHandler(/^tele\/.*\/TELEMETRY$/, TelemetryHandler(httpPublisher));

  mqttMediator.addHandler(/.*\/.*\/sensors\/([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})\/power/,
    S6PowerConsumeHandler(httpPublisher));

  return mqttMediator;
};

export default MediatorSetup;

import config from './config';
import EventsMediator from './networks/devices/events-mediator';

import StatResultHandler from './networks/devices/sonoff/handlers/stat-result-handler';
import LwtHandler from './networks/devices/sonoff/handlers/lwt-handler';
import TelemetryHandler from './networks/devices/sonoff/handlers/telemetry-handler';
import ResultHandler from './networks/devices/sonoff/handlers/result-handler';
// S6 Fresnel Handler
import S6PowerConsumeHandler from './networks/devices/s6fresnel/handlers/s6-power-handler';
import S6InfoHandler from './networks/devices/s6fresnel/handlers/s6-info-handler';
import S6PowerFeedbackHandler from './networks/devices/s6fresnel/handlers/s6-power-feedback-handler';
import S6LWTHandler from './networks/devices/s6fresnel/handlers/s6-lwt-handler';

import RestClient from './networks/http/rest-client';

// TODO: refactor for testing (as in server code)
const MediatorSetup = () => {
  const mqttMediator = EventsMediator();

  const httpPublisher = payload => RestClient(config.gatewayName, config.api.key)
    .post(`${config.api.url}events/`, payload);

  mqttMediator.addHandler(/^tele\/.*\/RESULT$/, ResultHandler(httpPublisher));
  mqttMediator.addHandler(/^stat\/.*\/RESULT$/, StatResultHandler(httpPublisher));
  mqttMediator.addHandler(/^tele\/.*\/LWT$/, LwtHandler(httpPublisher));
  mqttMediator.addHandler(/^tele\/.*\/TELEMETRY$/, TelemetryHandler(httpPublisher));

  // S6 Fresnel module messages
  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/power/,
    S6PowerConsumeHandler(httpPublisher));
  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/info/,
    S6InfoHandler(httpPublisher));
  mqttMediator.addHandler(/.*\/.*\/events\/.*\/power/,
    S6PowerFeedbackHandler(httpPublisher));
  mqttMediator.addHandler(/.*\/.*\/events\/.*\/lwt/,
    S6LWTHandler(httpPublisher));

  return mqttMediator;
};

export default MediatorSetup;

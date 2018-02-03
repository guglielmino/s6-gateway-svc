import config from './config';
import EventsMediator from './networks/devices/events-mediator';
import MessageEnvelope from './networks/message-envelope';

import StatResultHandler from './networks/devices/sonoff/handlers/stat-result-handler';
import LwtHandler from './networks/devices/sonoff/handlers/lwt-handler';
import TelemetryHandler from './networks/devices/sonoff/handlers/telemetry-handler';
import ResultHandler from './networks/devices/sonoff/handlers/result-handler';
// S6 Fresnel Handler
import S6PowerConsumeHandler from './networks/devices/s6fresnel/handlers/s6-power-handler';
import S6InfoHandler from './networks/devices/s6fresnel/handlers/s6-info-handler';
import S6PowerFeedbackHandler from './networks/devices/s6fresnel/handlers/s6-power-feedback-handler';
import S6LWTHandler from './networks/devices/s6fresnel/handlers/s6-lwt-handler';
import S6CurrentHandler from './networks/devices/s6fresnel/handlers/s6-current-handler';
import S6DailyHandler from './networks/devices/s6fresnel/handlers/s6-daily-consume-handler';
import S6FrequencyHandler from './networks/devices/s6fresnel/handlers/s6-frequency-handler';
import S6PowerFactorHandler from './networks/devices/s6fresnel/handlers/s6-power-factor-handler';
import S6ReactivePowerHandler from './networks/devices/s6fresnel/handlers/s6-reactive-power-handler';
import S6VoltageHandler from './networks/devices/s6fresnel/handlers/s6-voltage-handler';

import RestClient from './networks/http/rest-client';

// TODO: refactor for testing (as in server code)
const MediatorSetup = () => {
  const mqttMediator = EventsMediator();

  const httpPublisher = payload => RestClient(config.gatewayName, config.api.key)
    .post(`${config.api.url}events/`, payload);

  const envelope = MessageEnvelope(config.gatewayName);

  const handlerParams = { publisher: httpPublisher, envelope };

  mqttMediator.addHandler(/^tele\/.*\/RESULT$/, ResultHandler(handlerParams));
  mqttMediator.addHandler(/^stat\/.*\/RESULT$/, StatResultHandler(handlerParams));
  mqttMediator.addHandler(/^tele\/.*\/LWT$/, LwtHandler(handlerParams));
  mqttMediator.addHandler(/^tele\/.*\/TELEMETRY$/, TelemetryHandler(handlerParams));

  // S6 Fresnel module messages
  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/power$/,
    S6PowerConsumeHandler(handlerParams));
  mqttMediator.addHandler(/.*\/.*\/events\/.*\/info/,
    S6InfoHandler(handlerParams));
  mqttMediator.addHandler(/.*\/.*\/events\/.*\/power$/,
    S6PowerFeedbackHandler(handlerParams));
  mqttMediator.addHandler(/.*\/.*\/events\/.*\/lwt/,
    S6LWTHandler(handlerParams));
  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/reactivepower/,
    S6ReactivePowerHandler(handlerParams));
  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/dailyKwh/,
    S6DailyHandler(handlerParams));
  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/current/,
    S6CurrentHandler(handlerParams));
  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/frequency/,
    S6FrequencyHandler(handlerParams));
  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/powerfactor/,
    S6PowerFactorHandler(handlerParams));
  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/voltage/,
    S6VoltageHandler(handlerParams));

  return mqttMediator;
};

export default MediatorSetup;

import config from './config';
import * as consts from './consts';

// S6 Fresnel mappers
import S6SensorDataMapper from './networks/devices/s6fresnel/mappers/sensor-data-mapper';
import S6InfoMapper from './networks/devices/s6fresnel/mappers/info-mapper';
import S6LWTMapper from './networks/devices/s6fresnel/mappers/lwt-mapper';
import S6PowerFeedbackMapper from './networks/devices/s6fresnel/mappers/power-feedback-mapper';

// SONOFF mappers
import StatResultMapper from './networks/devices/sonoff/mappers/stat-result-mapper';
import LwtMapper from './networks/devices/sonoff/mappers/lwt-mapper';
import ResultMapper from './networks/devices/sonoff/mappers/result-mapper';
import TelemetryMapper from './networks/devices/sonoff/mappers/telemetry-mapper';

import EventsMediator from './networks/devices/events-mediator';
import MessageEnvelope from './networks/message-envelope';

import HandlerFactory from './networks/handler/handler-factory';

import httpPublisher from './networks/http/http-publisher';

// TODO: refactor for testing (as in server code)
const MediatorSetup = () => {
  const mqttMediator = EventsMediator();

  const envelope = MessageEnvelope(config.gatewayName);
  const httpPublisherHandler = HandlerFactory({ publisher: httpPublisher, envelope });

  mqttMediator.addHandler(/^tele\/.*\/RESULT$/,
    httpPublisherHandler({
      messageType: consts.EVENT_INFO,
      mapper: ResultMapper,
    }));

  mqttMediator.addHandler(/^stat\/.*\/RESULT$/,
    httpPublisherHandler({
      messageType: consts.EVENT_POWER_STATUS,
      mapper: StatResultMapper,
    }));

  mqttMediator.addHandler(/^tele\/.*\/LWT$/,
    httpPublisherHandler({
      messageType: consts.EVENT_LWT,
      mapper: LwtMapper,
    }));

  mqttMediator.addHandler(/^tele\/.*\/TELEMETRY$/,
    httpPublisherHandler({
      messageType: consts.EVENT_ENERGY,
      mapper: TelemetryMapper,
    }));

  // S6 Fresnel module messages
  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/power$/,
    httpPublisherHandler({
      messageType: consts.EVENT_S6_POWER_CONSUME,
      mapper: S6SensorDataMapper,
    }));

  mqttMediator.addHandler(/.*\/.*\/events\/.*\/info/,
    httpPublisherHandler({
      messageType: consts.EVENT_S6_INFO_CONSUME,
      mapper: S6InfoMapper,
    }));

  mqttMediator.addHandler(/.*\/.*\/events\/.*\/power$/,
    httpPublisherHandler({
      messageType: consts.EVENT_S6_POWER_FEED_BACK,
      mapper: S6PowerFeedbackMapper,
    }));

  mqttMediator.addHandler(/.*\/.*\/events\/.*\/lwt/,
    httpPublisherHandler({
      messageType: consts.EVENT_S6_LWT,
      mapper: S6LWTMapper,
    }));

  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/reactivepower/,
    httpPublisherHandler({
      messageType: consts.EVENT_S6_REACTIVE_POWER_CONSUME,
      mapper: S6SensorDataMapper,
    }));

  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/dailyKwh/,
    httpPublisherHandler({
      messageType: consts.EVENT_S6_DAILY_CONSUME,
      mapper: S6SensorDataMapper,
    }));

  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/current/,
    httpPublisherHandler({
      messageType: consts.EVENT_S6_CURRENT_CONSUME,
      mapper: S6SensorDataMapper,
    }));

  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/frequency/,
    httpPublisherHandler({
      messageType: consts.EVENT_S6_FREQUENCY,
      mapper: S6SensorDataMapper,
    }));

  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/powerfactor/,
    httpPublisherHandler({
      messageType: consts.EVENT_S6_POWER_FACTOR,
      mapper: S6SensorDataMapper,
    }));

  mqttMediator.addHandler(/.*\/.*\/sensors\/.*\/voltage/,
    httpPublisherHandler({
      messageType: consts.EVENT_S6_VOLTAGE,
      mapper: S6SensorDataMapper,
    }));

  return mqttMediator;
};

export default MediatorSetup;

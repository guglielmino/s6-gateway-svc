import logger from './logger';
import config from './config';
import EventsMediator from './networks/devices/events-mediator';

import ResultHandler from './networks/devices/handlers/result-handler';
import TelemetryHandler from './networks/devices/handlers/telemetry-handler';

const MediatorSetup = (pubNubHandler) => {
  const mqttMediator = EventsMediator();

  const pubNubPublish = channel => message => pubNubHandler.publish(channel, message);

  const pnPublisher = pubNubPublish(config.pubnub.pub_channel);

  mqttMediator.addHandler(/^stat\/.*\/INFO$/, msg => logger.log('info', `MSG => ${JSON.stringify(msg)}`));
  mqttMediator.addHandler(/^tele\/.*\/RESULT$/, ResultHandler(pnPublisher));
  mqttMediator.addHandler(/^tele\/.*\/TELEMETRY$/, TelemetryHandler(pnPublisher));

  return mqttMediator;
};

export default MediatorSetup;

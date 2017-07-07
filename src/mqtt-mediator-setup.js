import config from './config';
import EventsMediator from './networks/devices/events-mediator';

import StatResultHandler from './networks/devices/handlers/stat-result-handler';
import LwtHandler from './networks/devices/handlers/lwt-handler';


import RestClient from './networks/http/rest-client';

const MediatorSetup = () => {
  const mqttMediator = EventsMediator();

  const httpPublisher = payload => RestClient().post(`${config.api.url}events/`, payload);

  mqttMediator.addHandler(/^stat\/.*\/RESULT$/, StatResultHandler(httpPublisher));
  mqttMediator.addHandler(/^tele\/.*\/LWT$/, LwtHandler(httpPublisher));

  return mqttMediator;
};

export default MediatorSetup;

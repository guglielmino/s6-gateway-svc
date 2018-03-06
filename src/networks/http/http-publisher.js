import config from '../../config';
import RestClient from './rest-client';

const httpPublisher = payload => RestClient(config.gatewayName, config.api.key)
  .post(`${config.api.url}events/`, payload);

export default httpPublisher;

/**
 * Create a message handler using 'mapper' function to transform payload, publisher to send and
 * envelope function to wrap the result in a "could platform" expected way. messageType is the data
 * classifier
 * @param messageType string: which type of message the message brings to the ECMS platform
 * @param mapper function: transform device payload in the ECMS expected one
 * @returns {function({publisher: *, envelope: *}): function(*=)}
 * @constructor
 */

import { TopicToType, TopicRoot } from '../devices/topic-helper';

const HandlerFactory = ({ publisher, envelope }) => ({ mapper }) => (msg) => {
  const value = mapper(msg);
  if (value) {
    publisher(envelope(TopicRoot(msg.topic), TopicToType(msg.topic), value));
  }
};
export { HandlerFactory }; // eslint-disable-line import/prefer-default-export

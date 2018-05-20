import * as consts from './consts';

const PubNubDynamicSubscriber = (pubnub) => {
  const topicRootRe = /(^[\w-:]+)\/.*\/.*\/.*\/*./i;
  const subscribedTopics = [];

  return {
    handleTopic: (mqttTopic) => {
      const m = topicRootRe.exec(mqttTopic);
      if (m !== null) {
        const rootTopic = m[1];
        if (rootTopic !== consts.ROOT_TOPIC_LEGACY &&
              rootTopic !== consts.ROOT_TOPIC_LOCAL &&
              subscribedTopics.indexOf(rootTopic) === -1) {
          pubnub.subscribe(rootTopic);
          subscribedTopics.push(rootTopic);
        }
      }
    },
  };
};

export default PubNubDynamicSubscriber;

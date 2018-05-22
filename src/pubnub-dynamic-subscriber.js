import * as consts from './consts';
import { TopicRoot } from './networks/devices/topic-helper';

const PubNubDynamicSubscriber = (pubnub) => {
  const subscribedTopics = [];

  return {
    handleTopic: (mqttTopic) => {
      const rootTopic = TopicRoot(mqttTopic);
      if (rootTopic !== consts.ROOT_TOPIC_LEGACY &&
        rootTopic !== consts.ROOT_TOPIC_LOCAL &&
        subscribedTopics.indexOf(rootTopic) === -1) {
        pubnub.subscribe(rootTopic);
        subscribedTopics.push(rootTopic);
      }
    },
  };
};

export default PubNubDynamicSubscriber;

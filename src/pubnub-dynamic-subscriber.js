const PubNubDynamicSubscriber = (pubnub) => {
  const topicRootRe = /(^[\w-:]+)\/.*\/.*\/.*\/*./i;
  const subscribedTopics = [];

  return {
    handleTopic: (mqttTopic) => {
      const m = topicRootRe.exec(mqttTopic);
      if (m !== null) {
        const rootTopic = m[1];
        if (subscribedTopics.indexOf(rootTopic) === -1) {
          pubnub.subscribe(rootTopic);
          subscribedTopics.push(rootTopic);
        }
      }
    },
  };
};

export default PubNubDynamicSubscriber;

const TopicToDeviceId = (topic) => {
  const deviceIdRe = RegExp(/.*\/.*\/(?:sensors|events)\/(.*)\/.*/, 'gi');

  let ret = null;
  const resultTopic = deviceIdRe.exec(topic);
  if (resultTopic.length > 1) ret = resultTopic[1];
  return ret;
};

const TopicToType = (topic) => {
  const deviceTypeRe = RegExp(/.*\/.*\/(sensors|events)\/.*\/(.*)/, 'gi');

  let ret = null;
  const resultTopic = deviceTypeRe.exec(topic);
  if (resultTopic.length === 3) ret = `${resultTopic[1]}_${resultTopic[2]}`;
  return ret;
};

const TopicRoot = (topic) => {
  let ret = null;
  const topicRootRe = /(^[\w-:]+)\/.*\/.*\/.*\/*./i;

  const topicRoot = topicRootRe.exec(topic);
  if (topicRoot.length > 1) ret = topicRoot[1];
  return ret;
};

export { TopicToDeviceId, TopicToType, TopicRoot };


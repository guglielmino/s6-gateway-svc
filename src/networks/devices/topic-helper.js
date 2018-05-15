const TopicToDeviceId = (topic) => {
  const deviceIdre = RegExp(/.*\/.*\/(?:sensors|events)\/(.*)\/.*/, 'gi');

  let ret = null;
  const resultTopic = deviceIdre.exec(topic);
  if (resultTopic.length > 1) ret = resultTopic[1];
  return ret;
};

const TopicToType = (topic) => {
  const deviceTypere = RegExp(/.*\/.*\/(sensors|events)\/.*\/(.*)/, 'gi');

  let ret = null;
  const resultTopic = deviceTypere.exec(topic);
  if (resultTopic.length === 3) ret = `${resultTopic[1]}_${resultTopic[2]}`;
  return ret;
};


export { TopicToDeviceId, TopicToType };   // eslint-disable-line import/prefer-default-export


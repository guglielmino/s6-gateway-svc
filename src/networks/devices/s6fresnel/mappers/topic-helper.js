
const TopicToDeviceId = (topic) => {
  const deviceIdre = RegExp(/.*\/.*\/(?:sensors|events)\/(.*)\/.*/, 'gi');

  let ret = null;
  const resultTopic = deviceIdre.exec(topic);
  if (resultTopic.length > 1) ret = resultTopic[1];
  return ret;
};

export { TopicToDeviceId };   // eslint-disable-line import/prefer-default-export


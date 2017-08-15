
const TopicToDeviceId = (topic) => {
  const deviceIdre = RegExp(/.*\/.*\/(?:sensors|events)\/(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2}))\/.*$/, 'gi');

  let ret = null;
  const resultTopic = deviceIdre.exec(topic);
  if (resultTopic.length > 1) ret = resultTopic[1];
  return ret;
};

export { TopicToDeviceId };   // eslint-disable-line import/prefer-default-export


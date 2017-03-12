import rp from 'request-promise';

export default function () {
  return {
    post(url, payload) {
      const options = {
        method: 'POST',
        uri: url,
        body: payload,
        json: true,
      };

      return rp(options);
    },
  };
}

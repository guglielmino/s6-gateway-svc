import rp from 'request-promise';

export default function (gatewayId, authToken) {
  return {
    post(url, payload) {
      const options = {
        method: 'POST',
        uri: url,
        body: payload,
        json: true,
        headers: {
          'x-s6-gatewayid': gatewayId,
          'x-s6-auth-token': authToken,
        },
      };

      return rp(options);
    },
  };
}

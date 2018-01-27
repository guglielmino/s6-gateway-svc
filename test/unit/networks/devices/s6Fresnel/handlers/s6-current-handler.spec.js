'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import S6CurrentHandler from '../../../../../../src/networks/devices/s6fresnel/handlers/s6-current-handler';

describe('S6 Fresnel module current message handlers', () => {

  it('should call publisher function on device current message', () => {
    const msg = {
      topic: 'building/room1/sensors/24:0a:c4:03:b6:74/current',
      message: '{"value":23.4,"time":"2017-08-14T20:00:00.000Z"}'
    };

    const publisher = sinon.spy();
    const envelope = (msg) => msg;
    S6CurrentHandler({ publisher, envelope })(msg);
    publisher.calledOnce.should.be.true;
  });
});

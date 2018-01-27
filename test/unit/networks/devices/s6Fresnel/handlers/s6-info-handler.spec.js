'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import S6InfoHandler from '../../../../../../src/networks/devices/s6fresnel/handlers/s6-info-handler';

describe('S6 Fresnel module info message handlers', () => {

  it('should call publisher function on device info message', () => {
    const msg = {
      topic: 'building/room1/sensors/24:0a:c4:03:b6:74/info',
      message: '{"appName":"S6 Fresnel Module","version":"1.0.15","location":"room1"}'
    };

    const publisher = sinon.spy();
    const envelope = (msg) => msg;
    S6InfoHandler({ publisher, envelope })(msg);
    publisher.calledOnce.should.be.true;
  });
});

'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import S6FrequencyHandler from '../../../../../../src/networks/devices/s6fresnel/handlers/s6-frequency-handler';

describe('S6 Fresnel module frequency message handlers', () => {

  it('should call publisher function on device frequency message', () => {
    const msg = {
      topic: 'building/room1/sensors/24:0a:c4:03:b6:74/frequency',
      message: '{"value":4,"time":"2017-08-14T20:00:00.000Z"}'
    };

    const publisher = sinon.spy();
    S6FrequencyHandler(publisher)(msg);
    publisher.calledOnce.should.be.true;
  });
});

'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import S6ReactivePowerHandler from '../../../../../../src/networks/devices/s6fresnel/handlers/s6-reactive-power-handler';

describe('S6 Fresnel module reactive power message handlers', () => {

  it('should call publisher function on reactive power message', () => {
    const msg = {
      topic: 'building/room1/sensors/24:0a:c4:03:b6:74/reactivepower',
      message: '{"value":1,"time":"2017-08-14T20:00:00.000Z"}'
    };

    const publisher = sinon.spy();
    S6ReactivePowerHandler(publisher)(msg);
    publisher.calledOnce.should.be.true;
  });
});

'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import * as consts from '../../../../../../src/consts';
import S6PowerHandler from '../../../../../../src/networks/devices/s6fresnel/handlers/s6-power-handler';

describe('S6 Fresnel module power message handlers', () => {

  it('should call publisher function on device power message', () => {
    const msg = {
      topic: 'building/room1/sensors/24:0a:c4:03:b6:74/power',
      message: '{"power":23.4,"time":"2017-08-14T20:00:00.000Z"}'
    };

    const publisher = sinon.spy();
    S6PowerHandler(publisher)('building/room1/sensors/00:11:22:33:44:55/power', msg);
    publisher.calledOnce.should.be.true;
  });
});

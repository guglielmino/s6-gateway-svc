'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import * as consts from '../../../../../../src/consts';
import StatResultHandler from '../../../../../../src/networks/devices/sonoff/handlers/stat-result-handler';

describe('Sonoff Power feedback message handlers', () => {

  it('should call publisher function on device Power feedback message', () => {
    const msg = {
      topic: 'tele/lamp1/RESULT',
      message: '{"DeviceId":"5C:CF:7F:A0:2D:C6","POWER":"ON"}'
    };

    const publisher = sinon.spy();
    StatResultHandler(publisher)('tele/lamp1/RESULT', msg);
    publisher.calledOnce.should.be.true;
  });
});

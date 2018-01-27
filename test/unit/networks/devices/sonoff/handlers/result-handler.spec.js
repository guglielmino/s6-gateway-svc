'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import * as consts from '../../../../../../src/consts';
import ResultHandler from '../../../../../../src/networks/devices/sonoff/handlers/result-handler';

describe('Sonoff Info1 message handlers', () => {

  it('should call publisher function on device Info1 message', () => {
    const msg = {
      topic: 'tele/lamp1/RESULT',
      message: '{"Info1":{"AppName":"Sonoff Pow Module","Version":"1.0.15","FallbackTopic":"tele/DEV_123","GroupTopic":"cmnd/pows","DeviceId":"34:A8:B5:2A:23:0B","Topic":"cmnd/lampada"}}'
    };

    const publisher = sinon.spy();
    const envelope = (msg) => msg;
    ResultHandler({ publisher, envelope })(msg);
    publisher.calledOnce.should.be.true;
  });
});

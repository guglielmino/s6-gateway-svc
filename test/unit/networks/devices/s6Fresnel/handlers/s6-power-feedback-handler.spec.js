'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import S6PowerFeedbackHandler from '../../../../../../src/networks/devices/s6fresnel/handlers/s6-power-feedback-handler';

describe('S6 Fresnel module power feedback message handlers', () => {

  it('should call publisher function on device power feedback message', () => {
    const msg = {
      topic: 'building/room1/events/24:0a:c4:03:b6:74/power',
      message: '{"status":"on"}'
    };

    const publisher = sinon.spy();
    const envelope = (msg) => msg;
    S6PowerFeedbackHandler({ publisher, envelope })(msg);
    publisher.calledOnce.should.be.true;
  });
});

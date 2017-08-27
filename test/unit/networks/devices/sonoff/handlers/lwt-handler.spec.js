'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import * as consts from '../../../../../../src/consts';
import LwtHandler from '../../../../../../src/networks/devices/sonoff/handlers/lwt-handler';

describe('Sonoff LWT message handlers', () => {

  it('should call publisher function on device LWT message', () => {
    const msg = {
      topic: 'tele/lamp1/LWT',
      message: '{"Status":"Offline", "DeviceId":"5C:CF:7F:A0:2D:C6"}\n'
    };

    const publisher = sinon.spy();
    LwtHandler(publisher)(msg);
    publisher.calledOnce.should.be.true;
  });
});

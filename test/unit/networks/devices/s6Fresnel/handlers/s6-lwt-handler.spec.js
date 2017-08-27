'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import * as consts from '../../../../../../src/consts';
import S6LWTHandler from '../../../../../../src/networks/devices/s6fresnel/handlers/s6-lwt-handler';

describe('S6 Fresnel module LWT message handlers', () => {

  it('should call publisher function on device LWT message', () => {
    const msg = {
      topic: 'building/room1/events/24:0a:c4:03:b6:74/lwt',
      message: '{"status":"Online"}'
    };

    const publisher = sinon.spy();
    S6LWTHandler(publisher)(msg);
    publisher.calledOnce.should.be.true;
  });
});

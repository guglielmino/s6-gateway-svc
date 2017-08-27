'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import * as consts from '../../../../../../src/consts';
import S6LWTMapper from '../../../../../../src/networks/devices/s6fresnel/mappers/lwt-mapper';

describe('S6 Fresnel module LWT message mapper', () => {

  it('should map to deviceId, topic and status payload', () =>{
    const msg = {
      topic: 'building/room1/events/24:0a:c4:03:b6:74/lwt',
      message: '{"status":"Online"}'
    };
    const result = S6LWTMapper(msg);

    result.deviceId.should.be.eq('24:0a:c4:03:b6:74');
    result.status.should.be.eq('Online');
  });

});

'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import * as consts from '../../../../../../src/consts';
import S6PowerFeedbackMapper from '../../../../../../src/networks/devices/s6fresnel/mappers/power-feedback-mapper';

describe('S6 Fresnel module power feedback mapper', () => {

  it('should map to deviceId and power payload', () =>{
    const msg = {
      topic: 'building/room1/events/24:0a:c4:03:b6:74/power',
      message: '{"status": "on"}'
    };
    const result = S6PowerFeedbackMapper(msg);

    result.deviceId.should.be.eq('24:0a:c4:03:b6:74');
    result.status.should.be.eq("on");
  });

});

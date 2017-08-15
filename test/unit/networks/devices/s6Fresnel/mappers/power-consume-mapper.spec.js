'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import * as consts from '../../../../../../src/consts';
import S6PowerConsumeMapper from '../../../../../../src/networks/devices/s6fresnel/mappers/power-consume-mapper';

describe('S6 Fresnel module power consume message mapper', () => {

  it('should map to deviceId, power and time payload', () =>{
    const msg = {
      topic: 'building/room1/sensors/24:0a:c4:03:b6:74/power',
      message: '{"power":23.4,"time":"2017-08-14T20:00:00.000Z"}'
    };
    const result = S6PowerConsumeMapper(msg);

    result.deviceId.should.be.eq('24:0a:c4:03:b6:74');
    result.power.should.be.eq(23.4);
    result.time.should.be.eq('2017-08-14T20:00:00.000Z');
  });

});

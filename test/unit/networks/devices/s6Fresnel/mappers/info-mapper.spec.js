'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import * as consts from '../../../../../../src/consts';
import S6InfoMapper from '../../../../../../src/networks/devices/s6fresnel/mappers/info-mapper';

describe('S6 Fresnel module info message mapper', () => {

  it('should map to deviceId, appName, location and version payload', () =>{
    const msg = {
      topic: 'building/room1/sensors/24:0a:c4:03:b6:74/info',
      message: '{"appName":"S6 Fresnel Module","version":"1.0.15","location":"room1"}'
    };
    const result = S6InfoMapper(msg);

    result.deviceId.should.be.eq('24:0a:c4:03:b6:74');
    result.appName.should.be.eq('S6 Fresnel Module');
    result.version.should.be.eq('1.0.15');
    result.location.should.be.eq('room1');
  });

});

'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import  DevicePayloadapper from '../../../../../src/networks/devices/mappers/payload-mapper';

describe('Device Payload Mapper', () => {

  it('should map from a power message', () => {
    const msg = {
      topic: 'building/room1/sensors/24:0a:c4:03:b6:74/power',
      message: '{"value":23.4,"time":"2017-08-14T20:00:00.000Z"}'
    };
    const result = DevicePayloadapper(msg);

    result.deviceId.should.be.eq('24:0a:c4:03:b6:74');
    result.value.should.be.eq(23.4);
    result.time.should.be.eq('2017-08-14T20:00:00.000Z');
  });

  it('should map from a info message', () => {
    const msg = {
      topic: 'building/room1/sensors/24:0a:c4:03:b6:74/info',
      message: '{"appName":"S6 Fresnel Module","version":"1.0.15","location":"room1"}'
    };
    const result = DevicePayloadapper(msg);

    result.deviceId.should.be.eq('24:0a:c4:03:b6:74');
    result.appName.should.be.eq('S6 Fresnel Module');
    result.version.should.be.eq('1.0.15');
    result.location.should.be.eq('room1');
  });

  it('should map an array pauload a items array', () => {
    const msg = {
      topic: 'building/room1/sensors/24:0a:c4:03:b6:74/info',
      message: '[{ "name": "first"}, { "name": "second"} ]'
    };
    const result = DevicePayloadapper(msg);

    result.deviceId.should.be.eq('24:0a:c4:03:b6:74');
    result.items.should.be.an('array');
    result.items.length.should.be.eq(2);
  });

});

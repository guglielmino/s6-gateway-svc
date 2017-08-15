'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import * as consts from '../../../../../../src/consts';
import TelemetryHandler from '../../../../../../src/networks/devices/sonoff/handlers/telemetry-handler';

describe('Sonoff Power Telemetry message handlers', () => {

  it('should call publisher function on device Power Telemetry message', () => {
    const msg = {
      topic: 'tele/lamp1/TELEMETRY',
      message: '{"Time":"2017-07-08T12:47:36","Energy":{"Yesterday":"0.025","Today":"0.000","Period":0,"Power":0,"Factor":"0.00","Voltage":0,"Current":"0.000","DeviceId":"5C:CF:7F:A0:2D:C6"}}'
    };

    const publisher = sinon.spy();
    TelemetryHandler(publisher)(msg);
    publisher.calledOnce.should.be.true;
  });
});



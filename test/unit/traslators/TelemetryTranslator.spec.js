'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();

import proxyquire from 'proxyquire';
import TelemetryTranslator from '../../../src/translators/TelemetryTranslator';

describe('Telemetry Translator', () => {
    
    it('returns translated message embedding payload of sender', () => {
        const res = TelemetryTranslator({ topic: "device", message : '{"topic":"device","Energy":{"Voltage":220,"Current":12}, "Time" : "2017-01-21T08:48:46.309Z"}'});
        res.DeviceId.should.be.equal('device');
        res.Time.should.be.equal('2017-01-21T08:48:46.309Z');
        

    });
});
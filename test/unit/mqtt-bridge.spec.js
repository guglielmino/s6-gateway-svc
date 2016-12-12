'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();

import * as consts from '../../src/consts';
import MqttBridge from '../../src/mqtt-bridge';

describe('MQTT Bridge', () => {

	it('should create a Info command', (done) => {
		let mqttMessage = {topic: "stat/sonoff/RESULT", message: "{\"Info1\":{\"AppName\":\"Sonoff Pow module\", \"Version\":\"3.0.2\", \"FallbackTopic\":\"DVES_20D9AC\", \"GroupTopic\":\"pows\"}}" } ;

		const handlers = MqttBridge((resp) => {
			resp.type.should.be.equal(consts.CMD_INFO);
			resp.payload.Topic.should.ber.equal("stat/sonoff/RESULT");
			done();
		});

		let matching = handlers.filter((item) => item.pattern.test(mqttMessage.topic));
		matching.length.should.be.eq(1);
		matching[0].fn(mqttMessage);
	});

	it('should create a Energy command', (done) => {
		let mqttMessage =  {topic: "tele/sonoff/TELEMETRY", message: "{\"Time\":\"2016-12-10T15:15:23\", \"Energy\":{\"Yesterday\":\"0.000\", \"Today\":\"0.000\", \"Period\":0, \"Power\":0, \"Factor\":\"0.00\", \"Voltage\":0, \"Current\":\"0.000\"}}", timestamp:"2016-12-10T14:15:33.693Z" };

		const handlers = MqttBridge((resp) => {
			resp.type.should.be.equal(consts.CMD_ENERGY);
			resp.payload.Topic.should.ber.equal("tele/sonoff/TELEMETRY");
			done();
		});

		let matching = handlers.filter((item) => item.pattern.test(mqttMessage.topic));
		matching.length.should.be.eq(1);
		matching[0].fn(mqttMessage);
	});

});

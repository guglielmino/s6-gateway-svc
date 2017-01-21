'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();

import * as consts from '../../src/consts';
import MqttBridge from '../../src/mqtt-bridge';

describe('MQTT Bridge', () => {

	it('should create a Info event', (done) => {
		let mqttMessage = {topic: "stat/sonoff/RESULT", message: "{\"Info1\":{\"AppName\":\"Sonoff Pow module\", \"Version\":\"3.0.2\", \"FallbackTopic\":\"DVES_20D9AC\", \"GroupTopic\":\"pows\"}}" } ;

		const handlers = MqttBridge((resp) => {
			resp.Type.should.be.equal(consts.EVENT_INFO);
			done();
		});

		let matching = handlers.filter((item) => item.pattern.test(mqttMessage.topic));
		matching.length.should.be.eq(1);
		matching[0].fn(mqttMessage);
	});

	it('should create a Energy event', (done) => {
		let mqttMessage =  {topic: "tele/sonoff/TELEMETRY", message: "{\"Time\":\"2016-12-10T15:15:23\", \"Energy\":{\"Yesterday\":\"0.000\", \"Today\":\"0.000\", \"Period\":0, \"Power\":0, \"Factor\":\"0.00\", \"Voltage\":0, \"Current\":\"0.000\"}}", timestamp:"2016-12-10T14:15:33.693Z" };

		const handlers = MqttBridge((resp) => {
			resp.Type.should.be.equal(consts.EVENT_ENERGY);
			done();
		});

		let matching = handlers.filter((item) => item.pattern.test(mqttMessage.topic));
		matching.length.should.be.eq(1);
		matching[0].fn(mqttMessage);
	});

});

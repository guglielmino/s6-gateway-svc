'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();

import MqttHub from '../../../src/hubs/mqtt-hub';

describe('MQTT Hub', () => {

	let handlers = [];

	beforeEach(() => {
		handlers = [
			{
				pattern: /^stat\/.*\/POWER$/, fn: sinon.spy()
			},
			{
				pattern: /^tele\/.*\/VOLTAGE$/, fn: sinon.spy()
			},
			{
				pattern: /^tele\/.*\/CURRENT/, fn: sinon.spy()
			}
		];
	});

	it('should match stat POWER event', () => {
		const mqttHub = MqttHub(handlers);

		let MQTTMessage = { topic: "stat/sonoff/1/POWER", message: "OFF" };
		mqttHub.handleMsg(MQTTMessage);

		handlers[0].fn.calledOnce.should.be.true;
		handlers[1].fn.calledOnce.should.be.false;
		handlers[2].fn.calledOnce.should.be.false;
	});

	it('should match stat VOLTAGE event', () => {
		const mqttHub = MqttHub(handlers);

		let MQTTMessage = { topic: "tele/sonoff/VOLTAGE", message: "0" };
		mqttHub.handleMsg(MQTTMessage);

		handlers[0].fn.calledOnce.should.be.false;
		handlers[1].fn.calledOnce.should.be.true;
		handlers[2].fn.calledOnce.should.be.false;
	});

	it('should match stat CURRENT event', () => {
		const mqttHub = MqttHub(handlers);

		let MQTTMessage = { topic: "tele/sonoff/CURRENT", message: "0" };
		mqttHub.handleMsg(MQTTMessage);

		handlers[0].fn.calledOnce.should.be.false;
		handlers[1].fn.calledOnce.should.be.false;
		handlers[2].fn.calledOnce.should.be.true;
	});

});
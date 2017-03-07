'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import * as consts from '../../../../src/consts';
import EventsMediator from '../../../../src/networks/devices/events-mediator';


describe('device event mediator', () => {
	let subject;

	beforeEach(() => {
		subject = EventsMediator();
	});


	context('add handler', () => {
		it('should add a message handler', () => {
			(function () {
				subject.addHandler(/^tele\/.*\/RESULT$/, (msg) => {
				});
			})
				.should.not.throw(Error);
		});

		it('should throw if fn param is not a function', () => {

			(function () {
				subject.addHandler(/^tele\/.*\/RESULT$/, 'bla');
			})
				.should
				.throw(Error, 'fn should be a function');
		});

		it('should throw if pattern param is not a RegEx', () => {
			(function () {
				subject.addHandler('bla', (msg) => {
				});
			})
				.should
				.throw(Error, 'pattern should be a RegExp');
		});
	});


	context('handle message', () => {

		it('should handle message matching topic', () => {
			const msgHandler = sinon.stub();
			subject.addHandler(/^tele\/.*\/RESULT$/, msgHandler);
			subject.handle({ topic: 'tele/lamp1/RESULT', payload: 233 });
			msgHandler.calledOnce.should.be.true;
		});

		it('should do nothing for unknown topic', () => {
			const msgHandler = sinon.stub();
			subject.addHandler(/^tele\/.*\/RESULT$/, msgHandler);
			subject.handle({ topic: 'cmnd/lamp1/POWER', payload: 233 });
			msgHandler.calledOnce.should.not.be.true;
		});
	});
});

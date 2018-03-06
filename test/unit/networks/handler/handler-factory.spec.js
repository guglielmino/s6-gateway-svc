'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import HandlerFactory from '../../../../src/networks/handler/handler-factory';


describe('Handler factory', () => {

  it('should create an handler', () => {
    const mapper = (msg) => msg;
    const publisher = sinon.spy();
    const envelope = sinon.spy();

    const handler = HandlerFactory({ publisher, envelope });

    handler({ messageType: 'ATYPE', mapper })({});

    publisher.calledOnce.should.be.true;
    envelope.calledOnce.should.be.true;
    envelope.calledBefore(publisher).should.be.true;
    envelope.calledWith('ATYPE', sinon.match.any);
  });

  it('should call publisher function on mapped message with envelope function', () => {
    const sampleMessage = { value: 200, unit: 'V' };
    const mapper = (msg) => ({ ...msg, mapper: true });
    const publisher = sinon.spy();
    const envelope = (type, value) => ({
      GatewayId: 'AGW', Type: type, Payload: value,
    });

    const handler = HandlerFactory({ publisher, envelope });
    handler({ messageType: 'ATYPE', mapper })(sampleMessage);
    publisher.calledWith(sinon.match({GatewayId: 'AGW'})).should.be.true;
    publisher.calledWith(sinon.match({Type: 'ATYPE'})).should.be.true;
    publisher.calledWith(sinon.match({Payload: sinon.match({ value: 200 })})).should.be.true;

  });

});

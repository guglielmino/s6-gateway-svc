'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import { HandlerFactory, TopicHandlerFactory } from "../../../../src/networks/handler/handler-factory";


describe('Handler factories', () => {

  context('HandlerFactory', () => {
    it('should create an handler', () => {
      const mapper = (msg) => msg;
      const publisher = sinon.spy();
      const envelope = sinon.spy();

      const handler = HandlerFactory({publisher, envelope});

      handler({messageType: 'ATYPE', mapper})({});

      publisher.calledOnce.should.be.true;
      envelope.calledOnce.should.be.true;
      envelope.calledBefore(publisher).should.be.true;
      envelope.calledWith('ATYPE', sinon.match.any);
    });

    it('should call publisher function on mapped message with envelope function', () => {
      const sampleMessage = {value: 200, unit: 'V'};
      const mapper = (msg) => ({...msg, mapper: true});
      const publisher = sinon.spy();
      const envelope = (type, value) => ({
        GatewayId: 'AGW', Type: type, Payload: value,
      });

      const handler = HandlerFactory({publisher, envelope});
      handler({messageType: 'ATYPE', mapper})(sampleMessage);
      publisher.calledWith(sinon.match({GatewayId: 'AGW'})).should.be.true;
      publisher.calledWith(sinon.match({Type: 'ATYPE'})).should.be.true;
      publisher.calledWith(sinon.match({Payload: sinon.match({value: 200})})).should.be.true;

    });
  });

  context('TopicHandlerFactory', () => {
    it('should create an handler', () => {
      const mapper = (msg) => msg;
      const publisher = sinon.spy();
      const envelope = sinon.spy();

      const handler = TopicHandlerFactory({publisher, envelope});

      handler({mapper})({
        topic: 'building/room1/sensors/24:0a:c4:03:b6:74/info',
        message: '{"appName":"S6 Fresnel Module","version":"1.0.15","location":"room1"}'
      });

      publisher.calledOnce.should.be.true;
      envelope.calledOnce.should.be.true;
      envelope.calledBefore(publisher).should.be.true;
      envelope.calledWith('sensors_info', sinon.match.any);
    });

    it('should call publisher function on mapped message with envelope function', () => {
      const mapper = (msg) => msg.message;
      const publisher = sinon.spy();
      const envelope = (type, value) => ({
        GatewayId: 'AGW', Type: type, Payload: value,
      });

      const handler = TopicHandlerFactory({publisher, envelope});
      handler({mapper})({
        topic: 'building/room1/sensors/24:0a:c4:03:b6:74/info',
        message: JSON.parse('{"appName":"S6 Fresnel Module","version":"1.0.15","location":"room1"}')
      });
      publisher.calledWith(sinon.match({GatewayId: 'AGW'})).should.be.true;
      publisher.calledWith(sinon.match({Type: 'sensors_info'})).should.be.true;
      publisher.calledWith(sinon.match({Payload: sinon.match({appName: 'S6 Fresnel Module'})})).should.be.true;
      publisher.calledWith(sinon.match({Payload: sinon.match({version: '1.0.15'})})).should.be.true;
      publisher.calledWith(sinon.match({Payload: sinon.match({location: 'room1'})})).should.be.true;
    });
  });

});

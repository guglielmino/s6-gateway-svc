'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import MessageEnvelope from '../../../src/networks/message-envelope';

describe('MessageEnvelope', () => {

  it('should envelope payload and type in the cloud expected message', () => {
    const envelope = MessageEnvelope('GWNAME');

    const res = envelope('GWNAME', 'my-type', { name: 'name', age: 12 });

    res.GatewayId.should.be.eq('GWNAME');
    res.Type.should.be.eq('my-type');
    res.Payload.should.be.deep.equal({ name: 'name', age: 12 });
  });

  it('should return default gateway if passed gateway is \'building\'', () => {
    const envelope = MessageEnvelope('DEFAULTGW');

    const res = envelope('building','my-type', { name: 'name', age: 12 });

    res.GatewayId.should.be.eq('DEFAULTGW');
    res.Type.should.be.eq('my-type');
    res.Payload.should.be.deep.equal({ name: 'name', age: 12 });
  });


  it('should return default gateway if topic starts with \'local\'', () => {
    const envelope = MessageEnvelope('DEFAULTGW');

    const res = envelope('local','my-type', { name: 'name', age: 12 });

    res.GatewayId.should.be.eq('DEFAULTGW');
    res.Type.should.be.eq('my-type');
    res.Payload.should.be.deep.equal({ name: 'name', age: 12 });
  });

  it('should return gateway if topic doesn\'t start with \'local\' or \'building\'', () => {
    const envelope = MessageEnvelope('DEFAULTGW');

    const res = envelope('MYGW','my-type', { name: 'name', age: 12 });

    res.GatewayId.should.be.eq('MYGW');
    res.Type.should.be.eq('my-type');
    res.Payload.should.be.deep.equal({ name: 'name', age: 12 });
  });
});

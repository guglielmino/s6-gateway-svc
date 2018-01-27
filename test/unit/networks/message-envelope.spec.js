'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import MessageEnvelope from '../../../src/networks/message-envelope';

describe('MessageEnvelope', () => {

  it('should envelope payload and type in the cloud expected message', () => {
    const envelope = MessageEnvelope('GWNAME');

    const res = envelope('my-type', { name: 'name', age: 12 });

    res.GatewayId.should.be.eq('GWNAME');
    res.Type.should.be.eq('my-type');
    res.Payload.should.be.deep.equal({ name: 'name', age: 12 });
  });
});

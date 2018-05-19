'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import PubNubDynamicSubscriber from '../../src/pubnub-dynamic-subscriber';

describe('PubNubDynamicSubscriber', () => {
  let subject;
  let pubnub;

  beforeEach(() => {
    pubnub = { subscribe: sinon.spy() };
    subject = PubNubDynamicSubscriber(pubnub);
  });

  it('Should call subscribe with \'CASAFG\' as param', () => {
    const topic = 'CASAFG/room1/sensors/esp32_03B674/reactivepower';

    subject.handleTopic(topic);

    pubnub.subscribe.calledOnce.should.be.true;
    pubnub.subscribe.calledWith('CASAFG').should.be.true;
  });

  it('Should call subscribe only once if topic root is the same', () => {
    const topic = 'CASAFG/room1/sensors/esp32_03B674/reactivepower';

    subject.handleTopic(topic);
    subject.handleTopic(topic);

    pubnub.subscribe.calledOnce.should.be.true;
  });

});

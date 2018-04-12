'use strict';

import chai from 'chai';
import sinon from 'sinon';

chai.should();
let expect = chai.expect;

import { TopicToDeviceId, TopicToType } from '../../../../src/networks/devices/topic-helper';

describe('topic helper', () => {

  context('TopicToDeviceId', () => {
    it('should returns 00:11:22:33:44:55 from events topic', () => {
      const topic = 'building/room1/events/00:11:22:33:44:55/power';

      const res = TopicToDeviceId(topic);

      res.should.be.eq('00:11:22:33:44:55');
    });

    it('should returns 00:11:22:33:44:55 from sensors topic', () => {
      const topic = 'building/room1/sensors/00:11:22:33:44:55/dailyconsume';

      const res = TopicToDeviceId(topic);

      res.should.be.eq('00:11:22:33:44:55');
    });
  });

  context('TopicToType', () => {
    it('should returns sensors_dailyconsume from a sensor topic', () => {
      const topic = 'building/room1/sensors/00:11:22:33:44:55/dailyconsume';

      const res = TopicToType(topic);

      res.should.be.eq('sensors_dailyconsume');
    });

    it('should returns events_power from a events topic', () => {
      const topic = 'building/room1/events/00:11:22:33:44:55/power';

      const res = TopicToType(topic);

      res.should.be.eq('events_power');
    });
  });

});

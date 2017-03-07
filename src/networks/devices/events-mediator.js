'use strict';

const EventsMediator = () => {
	const handlers = [];
	return {
		addHandler: (pattern, fn) => {
			if(!(pattern instanceof RegExp)) {
				throw Error('pattern should be a RegExp');
			}
			if(typeof fn !== 'function') {
				throw Error('fn should be a function');
			}

			handlers.push({pattern, fn});
		},

		handle: (msg) => {
			if (msg.topic) {
				let matching = handlers.filter((item) => item.pattern.test(msg.topic));
				matching.forEach(handler => handler.fn(msg));
			}
		}

	}


};

export default EventsMediator;


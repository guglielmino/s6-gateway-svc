import Consumption from './commands/consumption';

export const handlers = [
	{
		pattern: /^stat\/.*\/POWER$/, fn: (msg) => Consumption(msg.topic, msg.message)
	},
	{
		pattern: /^tele\/.*\/VOLTAGE$/, fn: (msg) => console.log(`VOLTAGE ${msg}`)
	},
	{
		pattern: /^tele\/.*\/CURRENT/, fn: (msg) => console.log(`CURRENT ${msg}`)
	}
];
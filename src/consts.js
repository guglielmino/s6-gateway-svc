// Device event (proxied by MQTT ones)
export const DEVENT_SRV_CONNECT = 'srv-connect';
export const DEVENT_SRV_ERROR = 'srv-error';
export const DEVENT_DEV_MESSAGE = 'dev-message';


// Network events from PubNub
export const NEVENT_MESSAGE = 'net-message';
export const NEVENT_STATUS = 'net-status';
export const NEVENT_PRESENCE = 'net-presence';

// Events Type sent to PubNub
export const EVENT_ENERGY = 'ENERGY';
export const EVENT_INFO = 'INFO';
export const EVENT_POWER_STATUS = 'POWER_STATUS';
export const EVENT_LWT = 'LWT';

export const EVENT_S6_POWER_CONSUME = 'FRESNEL_POWER_CONSUME';
export const EVENT_S6_REACTIVE_POWER_CONSUME = 'FRESNEL_REACTIVE_POWER_CONSUME';
export const EVENT_S6_DAILY_CONSUME = 'FRESNEL_DAILY_CONSUME';
export const EVENT_S6_CURRENT_CONSUME = 'FRESNEL_CURRENT_CONSUME';
export const EVENT_S6_FREQUENCY = 'FRESNEL_FREQUENCY';
export const EVENT_S6_POWER_FACTOR = 'FRESNEL_POWER_FACTOR';

export const EVENT_S6_INFO_CONSUME = 'FRESNEL_INFO';
export const EVENT_S6_POWER_FEED_BACK = 'FRESNEL_POWER_FEEDBACK';
export const EVENT_S6_LWT = 'FRESNEL_LWT';

// Commands
export const CMD_DEVICE_LIST = 'DEVICE_LIST';

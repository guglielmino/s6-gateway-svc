let config = {
	mqtt_url: process.env.MQTT_URL || 'mqtt://localhost',
	websocket_url: process.env.WS_URL || 'ws://echo.websocket.org'
}

export default config;
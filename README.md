# Device to Internet Adapter

## Introdution

The project is an adapter layer for handling communications between a web application and
devices located inside a LAN.

The reasons that aims this layer are:

* Strong separation from protocols used inside LAN and the ones used outside
* Abstraction from device supported protocols
* Security

## Architecture

The architecture is based on decoupling internal communication from outside.
In this implementation the internal communication is made using MQTT, so there is 
a MQTT Broker ([mosquitto](https://mosquitto.org/) is our case) who manage communications with devices.
Adapter receive custom messages from dashboard web app translates them into the equivalent MQTT.
On the other side it subscribes MQTT topics, receive messages and translates them to custom messages
 to be interpretated by Dashboard Web App.



          +-------+
          | Device|
          +-------+ -+  +--------+
                     |  | MQTT   |
                     >- | Broker |
          +-------+  |  |        |
          | Device| -+  +--------+
          +-------+
                            ^
                            |
                            |
                            |           |I|
                            |           |N|
                        +---------+     |T|     +-----------+
                        | Adapter | --> |E| --> | Dashboard |
                        |         |     |R|     +-----------+
                        +---------+     |N|
                                        |E|
                                        |T|


## Custom messages

This is a list of custom messages sent and received to/from Web Dashboard.

#### Energy 

This message is sent from devices to give feedback on consumption and other enery parameters.

        {
          "GatewayId": "Negozio1",
          "Type": "ENERGY",
          "Payload": {
            "DeviceId": "tele/sonoff/TELEMETRY",
            "Yesterday": "0.000",
            "Today": "0.000",
            "Period": 0,
            "Power": 0,
            "Factor": "0.00",
            "Voltage": 0,
            "Current": "0.000",
            "Time": "2016-12-10T15:08:42"
          }
        }

## Development

To work with the project some npm script are defined.

        npm run build     # build project in dist/ folder
        npm run start     # Run project from dist/ folder (it need to be build before)
        npm run test      # Run unit test
        npm run test:e2e  # Run end2end test
        npm run clean     # Clean the dist folder
        npm run dev       # Run in dev (using nodemon)

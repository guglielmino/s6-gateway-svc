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


### Custom messages

This is a list of custom messages 


        {
            type: "MQTT",
            payload: {
                topic: "cmnd/device/POWER
            }
        }


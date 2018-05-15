# Device to Internet Adapter (SmartSix Gateway)

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

This message is sent from devices with data about power consumption.

        
    {  
      "GatewayId":"CASAFG",
      "Type":"sensors_power",
      "Payload":{  
        "topic":"building/room1/sensors/00:11:22:33:44:55/power",
        "deviceId":"00:11:22:33:44:55",
        "timestamp":"2017-08-27T07:56:23.642Z",
        "value":9
      }
    }


## Configuration

Application is configured using environment variables. To make them persistent we use dontenv.
Before launcing the application a .env file must be created in the root putting inside all the enviroment variables
needed by the app.
App variables are:


* NODE_ENV => 'development' or 'production', define the environment in which app is running
* PUBNUB_PKEY => PubNub publish key
* PUBNUB_SKEY => PubNub subscribe key
* PUBNUB_PUB_CHANNEL => PubNub channel for publish events (typically is 'events')
* PUBNUB_SUB_CHANNEL => PubNub channel where commands are received, every gateway has a specific channel
* MQTT_URL => Url of the MQTT brocker (typically mqtt://127.0.0.1)
* GATEWAY_NAME='DevelopmentGateway'

## Development

To work with the project some npm script are defined.

        npm run build     # build project in dist/ folder
        npm run start     # Run project from dist/ folder (it need to be build before)
        npm run test      # Run unit test
        npm run test:e2e  # Run end2end test
        npm run clean     # Clean the dist folder
        npm run dev       # Run in dev (using nodemon)

## Installation

### Prerequisites

Before installing the Application gateway follow pre-requisites must be met:

* NodeJS >= 8.1.x
* Download `update.sh` script from project sources

### Environment variables

Application update and deployment is managed by `update.sh` shell script. This script needs
some environment variables to work properly, these have to be defined before running the script itself.

* SUB_KEY="PubNub subscription key for the 'update' channel, used to wait for update event"
* GITLAB_PRIVATE_TOKEN="GitLab token for downloading release artifacts"
* GITLAB_GROUP="GitLab group name the project belongs to"
* GITLAB_PROJECT="GitLab project name"
* GITLAB_JOBNAME="GitLab pipeline job name used to build the release"
* DEST_RELEASE_PATH="Path where to deploy the application (default `/opt/s6-gateway-app`)

In Ubuntu OS system wide environment variables can be set in `/etc/environment`, this file is read at system boot but
can be force read with `source /etc/environment`

### Installation script

To install the application download the `update.sh` from GitLab project repository and run it as below:

`. ./update.sh -p`

After the installation the application have to be fed with the environment variables as described in [Configuration](#Configuration)





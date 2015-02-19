# Dolphin netplay proxy

## Installation

* Install nodejs
* Clone the project and run `npm install`

## How to use

* Open a udp port on your internet router, ex: forward udp port 5000 to your machine on port 5000.
* Configure dolphin to listen netplay on this port, via the main option window
* Run the poxy: `nodejs index.js`
* Connect to the machine running the proxy on port 3000 with you browser
* Paste your ip adress in the text field with the chose port, ex: 165.45.186.45:5000
* The message `dolphin-netplay-proxy ready on [proxy ip]:[random port]` should appear
* Host a game
* Give `[proxy ip]:[random port]` to the person you want to play with
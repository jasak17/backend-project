const io = require('socket.io-client');
const config = require('../config.json');
const socket = io.connect(config['socket-server']);

const args = process.argv
let a = 0

/**
 * client parsing arguments from command line for example /
 * node client.js 1 2 3 /
 * is subscribed to messages from accounts with ids 1,2,3 
 */
for(let id of args) {
    socket.on(String(id), (data) => {console.log('client: ' + data + 'number of message: ' + (a++));})
}


import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import config from './config.json';

const port = config['pub-sub-port']
const httpServer = createServer();
const io = new Server(httpServer);

/**
 * Service is listening for emit from tracking-service, /
 * then emit it to the subscribed clients. Channels is  /
 * named by the id of account.
 */
io.on('connection', (socket) => {

  socket.on('pub-sub-service', function (message: string) {
    console.log(`pub-sub-service received: '${message}'`)
    io.emit(String(JSON.parse(message).id), message);
  });

});

httpServer.listen(port);
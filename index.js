const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res, next) => res.send('Hello world!'));

const server = app.listen(9000, () => {
	console.log('Listening on PORT 9000');
});

const peerServer = ExpressPeerServer(server, {
	path: '/myapp',
});

peerServer.on('connection', (client) => {
	console.log('Client connected ', { client });
});

peerServer.on('disconnect', (client) => {
	console.log('Client disconnected', { client });
});

app.use('/peerjs', peerServer);

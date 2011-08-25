var http    =	require('http');
var fs      =	require('fs');
var io	    =	require('socket.io');

// Creation du serveur
var app = http.createServer(function (req, res) {
	// On lit notre fichier app.html
	fs.readFile('./tchat.html', 'utf-8', function(error, content) {
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end(content);
	});
});

io = io.listen(app); // Socket io ecoute maintenant notre application !

// Variables globales

// liste des messages de la forme {pseudo : X, message : 'Mon message'}
var messages = [];

//// SOCKET.IO ////

// Quand une personne se connecte au serveur
io.sockets.on('connection', function (socket) {
	// On donne la liste des messages
	socket.emit('recupererMessages', messages);
	socket.on('nouveauMessage', function (mess) {
		messages.push(mess);
		// On envoie a tout le monde le nouveau message
		socket.broadcast.emit('recupererNouveauMessage', mess);
	});
});

///////////////////

// Notre application ecoute sur le port 8080
app.listen(8080);
console.log('Live Chat App running at http://localhost:8080/');

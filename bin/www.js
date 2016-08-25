#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('Chat:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

var io = require("socket.io")(server);

let users = new Map();

io.on("connection", (socket) => {
    console.log(socket.id + " was connected!");

    socket.on("joined", (who) => {
        console.log(`${who} was joined!`);

        users.set(socket.id, who);

        io.emit("joined", who);
    });

    socket.on("msg-cmd", (sender, cmd, cb) => {

        let cmdParsed = cmd.split(" ");

        switch (cmdParsed[0].substr(1)) {
            case "users":
                let usersList = [];
                console.log(`${sender} request user list.`);

                for (let value of users.values()) {
                    usersList.push(value);
                }

                cb(usersList);
                break;
            default:
                console.log("Command not found!");
                break;
        }

    });

    socket.on("msg-chat", (time, from, message) => {
        console.log(`${time} ${from}: ${message}`);
        io.emit("msg-chat", time, from, message);
    });

    socket.on("disconnect", () => {
        users.delete(socket.id);
    });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports.io = io;
global.$socketMap = {};
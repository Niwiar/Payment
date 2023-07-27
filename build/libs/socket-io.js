"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSocketToServer = exports.sendSocketToRoom = exports.socketIO = exports.socketServer = void 0;
const socket_io_1 = require("socket.io");
let io;
const socketServer = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:3000',
        },
        connectionStateRecovery: {
            maxDisconnectionDuration: 2 * 60 * 1000,
            skipMiddlewares: true,
        },
    });
};
exports.socketServer = socketServer;
const socketIO = () => {
    io.on('connection', (socket) => {
        console.log('A new client connected!');
        // Listen for msg events from this client
        socket.on('msg', (msg) => {
            console.log(msg);
        });
        // Listen for the disconnect event
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
exports.socketIO = socketIO;
const sendSocketToRoom = ({ Room, Key, Data }) => io.to(Room).emit(Key, Data);
exports.sendSocketToRoom = sendSocketToRoom;
const sendSocketToServer = ({ Key, Data }) => io.emit(Key, Data);
exports.sendSocketToServer = sendSocketToServer;
//# sourceMappingURL=socket-io.js.map
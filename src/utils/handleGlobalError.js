import http from 'http';
import { Server } from 'socket.io';

export const handleGlobalError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An error Occurred';

    // Log the error
    console.error(err);

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
};

export const socketHandler = (app) => {
    const server = http.createServer(app);
    const socketIo = new Server(server);
    return socketIo;
}


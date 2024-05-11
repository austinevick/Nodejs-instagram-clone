import express from 'express';
import router from './routes/Routes.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', router);

const server = http.createServer(app);
const socketIo = new Server(server);




const port = 3000;
server.listen(port, async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connection successful');
    } catch (error) {
        console.log('Failed to connect to db');
    }
    return console.log('listening on port 3000');
});


socketIo.on("connection", (socket) => {
    console.log(socket.data);

    socket.emit('like', "dksodsjdsffjjf");

    socket.on('likes', (msg) => {
        console.log('message: ' + msg);
    });

});





// let value = 1000000 + '';
// let len = value.length;
// let sym = len > 6 ? 'm' : 'k';
// let hundred = (len == 9 || len == 6);
// if (len > 3) {
//     value = value.slice(0, -3) + (hundred ? '' : '') + sym;
// };

// console.log(value);
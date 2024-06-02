const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware para parsear JSON
 
app.use(express.json());
 
// Conectar a MongoDB
 
mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
 
// Configurar socket.io
 
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const authRoutes = require('./routes/auth');
const notificationRoutes = require('./routes/notifications');

// Usar rutas

app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);

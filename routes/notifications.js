const express = require('express');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth'); // Middleware de autenticación
const router = express.Router();
const io = require('../server'); // Importar io desde server.js

// Ruta para crear una nueva notificación

router.post('/', auth, async (req, res) => {
    const { message } = req.body;
    const notification = new Notification({ user: req.user, message });
    try {
        await notification.save();
        io.emit('notification', notification); // Emitir la notificación a todos los clientes conectados
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para obtener todas las notificaciones de un usuario

router.get('/', auth, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user }).sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const Chat = require('./models/Chat'); // Importamos el modelo de Chat

const app = express();

// Middleware para procesar JSON recibido en las peticiones
app.use(express.json());

// Leer enlace de MongoDB desde Render
const mongoURI = process.env.MONGO_URI;

// Conexión a MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado exitosamente a MongoDB Atlas'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// 1. Ruta base de prueba
app.get('/', (req, res) => {
  res.send('API de Chats activa en Render');
});

// 2. Ruta para GUARDAR un nuevo chat
app.post('/api/chats', async (req, res) => {
  try {
    const { nombre, ultimoMensaje } = req.body;
    
    if (!nombre) {
      return res.status(400).json({ mensaje: 'El nombre del chat es obligatorio' });
    }

    const nuevoChat = new Chat({ nombre, ultimoMensaje });
    await nuevoChat.save();

    res.status(201).json({ mensaje: 'Chat guardado con éxito', chat: nuevoChat });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar el chat', error: error.message });
  }
});

// 3. Ruta para OBTENER ÚNICAMENTE LOS 10 PRIMEROS CHATS
app.get('/api/chats', async (req, res) => {
  try {
    // .limit(10) asegura que MongoDB solo devuelva máximo 10 registros
    const chats = await Chat.find().limit(10);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los chats', error: error.message });
  }
});

// Configuración del puerto para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

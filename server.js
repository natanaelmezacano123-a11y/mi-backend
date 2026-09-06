const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware para entender JSON en las peticiones
app.use(express.json());

// Obtener la variable de entorno de MongoDB definida en Render
const mongoURI = process.env.MONGO_URI;

// Conexión a la base de datos de MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB Atlas exitosamente'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Ruta de prueba para verificar que el servidor está respondiendo
app.get('/', (req, res) => {
  res.send('Servidor activo y respondiendo desde Render');
});

// Configuración del puerto dinámico requerido por Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

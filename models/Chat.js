const mongoose = require('mongoose');

// Definimos la estructura que tendrá cada chat
const chatSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  ultimoMensaje: {
    type: String,
    default: ''
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', chatSchema);

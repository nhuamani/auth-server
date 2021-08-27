const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({

  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
})

module.exports = model('Usuario', UsuarioSchema);

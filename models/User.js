const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
});

module.exports = model('User', UserSchema);
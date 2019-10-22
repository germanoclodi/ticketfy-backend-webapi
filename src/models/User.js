const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    status: {
        type: String,
        required: false,
        default: "Ativo"
    },
    avatar: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: "editor"
    }
});

mongoose.model('User', UserSchema);
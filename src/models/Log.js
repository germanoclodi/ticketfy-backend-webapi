const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    ticketId:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: {} });

mongoose.model('Log', LogSchema);
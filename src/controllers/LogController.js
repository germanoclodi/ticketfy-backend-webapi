const mongoose = require('mongoose');
const Log = mongoose.model('Log');

module.exports = {
    async show(req, res) {
        const log = await Log.find({ ticketId: req.params.id });
        return res.json(log);
    },
    async store(req, res) {
        const log = await Log.create(req.body);
        return res.status(201).json(log);
    }
}
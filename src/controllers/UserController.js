const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');
const middleware = require('../config/middleware');

module.exports = {
    async index(req, res) {
        let decoded = middleware.decodeToken(middleware.cleanToken(req.headers["authorization"]));
        const users = await User.find({companyId: decoded.user.companyId});
        return res.json(users);
    },
    async show(req, res) {
        const user = await User.findById(req.params.id);
        return res.json(user);
    },
    async store(req, res) {
        const { email, password } = req.body;
        try {
            if (await User.findOne({ email })) {
                return res.status(400).send({
                    error: "Usuário já cadastrado"
                });
            }

            const hash = await bcrypt.hash(password, 10);
            req.body.password = hash;

            const user = await User.create(req.body);
            return res.status(201).send({
                success: true,
                user: user
            });
        } catch (err) {
            return res.status(400).send({
                error: err
            });
        }
    },
    async update(req, res) {
        const user = await User.findAndModify(req.params.id, req.body, { new: true });
        return res.json(user);
    },
    async destroy(req, res) {
        await User.findByIdAndRemove(res.params.id);
        return res.send();
    }
}
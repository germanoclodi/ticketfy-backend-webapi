const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv/config');

const User = mongoose.model('User');

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (user) {
            const password_verify = await bcrypt.compare(password, user.password);
            if (password_verify) {
                let token = jwt.sign({ user: user }, process.env.SECRET_API_KEY);
                return res.json({
                    success: true,
                    user: user,
                    token: token
                });
            }
            else {
                return res.status(400).send({
                    error: true,
                    message: 'Password Incorrect'
                });
            }
        }
        return res.status(400).send({
            error: true,
            message: 'User Not Found'
        });
    }

}
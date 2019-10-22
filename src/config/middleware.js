let jwt = require('jsonwebtoken');
require('dotenv/config');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token = cleanToken(token);
    if (token) {
        jwt.verify(token, process.env.SECRET_API_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

let cleanToken = (token) => {
    if (String(token).startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    return token;
};

let decodeToken = (token) => {
    return jwt.decode(token);
};

module.exports = {
    checkToken: checkToken,
    cleanToken: cleanToken,
    decodeToken: decodeToken
}
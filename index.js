const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv/config');

const app = express();
app.use(express.json());

app.use(cors());

app.use(
    "/files",
    express.static(path.resolve(__dirname, "tmp", "uploads"))
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true });

requireDir('./src/models');

app.use('/api', require('./src/routes'));

app.listen(process.env.PORT || 3000);
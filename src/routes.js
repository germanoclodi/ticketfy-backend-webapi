const express = require('express');
const routes = express.Router();
const middleware = require('./config/middleware');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const LogController = require('./controllers/LogController');

// User
routes.get("/user", middleware.checkToken, UserController.index);
routes.get("/user/:id", middleware.checkToken, UserController.show);
routes.post("/user", UserController.store);
routes.put("/user/:id", middleware.checkToken, UserController.update);
routes.delete("/user/:id", middleware.checkToken, UserController.destroy);

// Auth
routes.post("/login", AuthController.login);

// Log
routes.get("/log/:id", middleware.checkToken, LogController.show);
routes.post("/log", LogController.store);

module.exports = routes;
const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Buyer/Auth");

exRoute.post("/register", ctrl.handleRegistration);
exRoute.post("/login", ctrl.handleLogin);

module.exports = exRoute;

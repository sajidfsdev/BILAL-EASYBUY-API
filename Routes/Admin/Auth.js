const express = require("express");
const exRoute = express.Router();
const ctrl = require("../../Controller/Admin/Auth");
const AuthVal = require("../../Middleware/Auth");

exRoute.post("/register", ctrl.handleRegister);

exRoute.post("/login", ctrl.handleLogin);

exRoute.post("/get", AuthVal, ctrl.handleGetProfileInfo);

exRoute.post("/edit", AuthVal, ctrl.handleEditProfileInfo);

exRoute.post("/edit/password", AuthVal, ctrl.handleEditPassword);

module.exports = exRoute;

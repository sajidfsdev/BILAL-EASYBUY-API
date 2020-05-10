const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Buyer/Auth");
const AuthVal = require("./../../Middleware/AuthBuyer");

exRoute.post("/register", ctrl.handleRegistration);
exRoute.post("/login", ctrl.handleLogin);
exRoute.post("/get", AuthVal, ctrl.handleGetProfileInfo);
exRoute.post("/edit", AuthVal, ctrl.handleEditProfileInfo);
exRoute.post("/editPassword", AuthVal, ctrl.handleEditPassword);

module.exports = exRoute;

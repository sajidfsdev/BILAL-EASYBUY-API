const express = require("express");
const exRouter = express.Router();
const ctrl = require("./../../Controller/Vendor/auth");

exRouter.post("/register", ctrl.handleRegisterVendor);
exRouter.post("/login", ctrl.handleLogin);

module.exports = exRouter;

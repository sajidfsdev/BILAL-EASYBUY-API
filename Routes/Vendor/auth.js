const express = require("express");
const exRouter = express.Router();
const ctrl = require("./../../Controller/Vendor/auth");
const AuthVal = require("./../../Middleware/AuthVendor");

exRouter.post("/register", ctrl.handleRegisterVendor);
exRouter.post("/login", ctrl.handleLogin);
exRouter.post("/get", AuthVal, ctrl.handleGetProfileInfo);
exRouter.post("/edit", AuthVal, ctrl.handleEditProfileInfo);
exRouter.post("/editPassword", AuthVal, ctrl.handleEditPassword);
exRouter.post("/hibernate", AuthVal, ctrl.handleChangeHibernateStatus);

module.exports = exRouter;

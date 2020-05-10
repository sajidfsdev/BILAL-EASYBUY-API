const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Vendor/Message");
const AuthVal = require("./../../Middleware/AuthVendor");

exRoute.post("/send", AuthVal, ctrl.handleSendMessages);

exRoute.get("/get", AuthVal, ctrl.handleGetMessages);

exRoute.post("/delete", AuthVal, ctrl.handleDeleteMessages);

module.exports = exRoute;

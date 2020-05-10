const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Buyer/Message");
const AuthVal = require("./../../Middleware/AuthBuyer");

exRoute.post("/send", AuthVal, ctrl.handleSendMessages);

exRoute.get("/get", AuthVal, ctrl.handleGetMessages);

exRoute.post("/delete", AuthVal, ctrl.handleDeleteMessages);

module.exports = exRoute;

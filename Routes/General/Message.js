const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/General/Messages");

exRoute.post("/send", ctrl.handleSendMessage);

module.exports = exRoute;

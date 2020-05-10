const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Buyer/Report");
const AuthVal = require("./../../Middleware/AuthBuyer");

exRoute.post("/report", AuthVal, ctrl.handleReportAbuse);

module.exports = exRoute;

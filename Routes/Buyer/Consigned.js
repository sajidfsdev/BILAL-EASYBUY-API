const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Buyer/Consigned");
const AuthVal = require("./../../Middleware/AuthBuyer");

exRoute.post("/request", AuthVal, ctrl.handleRequestConsignment);
exRoute.post("/fetch", AuthVal, ctrl.handleFetchConsignments);
exRoute.post("/get", AuthVal, ctrl.handleGetMyStatusConsignments);

module.exports = exRoute;

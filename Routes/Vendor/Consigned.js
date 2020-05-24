const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Vendor/Consigned");
const AuthVal = require("./../../Middleware/AuthVendor");

exRoute.post("/get", AuthVal, ctrl.handleGetConsigned);
exRoute.post("/status", AuthVal, ctrl.handleSetStatus);
exRoute.post("/update", AuthVal, ctrl.handleUpdateConsignment);
exRoute.post("/finish", AuthVal, ctrl.handleCompleteAgreement);
exRoute.get("/stats", AuthVal, ctrl.handleGetMyStats);

module.exports = exRoute;

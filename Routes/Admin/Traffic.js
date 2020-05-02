const AuthVal = require("./../../Middleware/Auth");
const ctrl = require("./../../Controller/Admin/traffic");
const express = require("express");
const exRoute = express.Router();

exRoute.post("/get", AuthVal, ctrl.handleGetAllTraffic);

exRoute.post("/setstatus", AuthVal, ctrl.handleUpdateAccountStatus);

exRoute.post("/ads", AuthVal, ctrl.handleLoadVendorAds);

module.exports = exRoute;

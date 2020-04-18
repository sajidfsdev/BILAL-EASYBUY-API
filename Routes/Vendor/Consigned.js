const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Vendor/Consigned");
const AuthVal = require("./../../Middleware/AuthVendor");

exRoute.post("/get", AuthVal, ctrl.handleGetConsigned);

module.exports = exRoute;

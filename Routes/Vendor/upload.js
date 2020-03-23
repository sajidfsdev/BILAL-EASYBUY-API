const express = require("express");
const exRoute = express.Router();
const AuthVal = require("./../../Middleware/AuthVendor");
const ctrl = require("./../../Controller/Vendor/upload");

exRoute.post("/one", AuthVal, ctrl.handleUploadProductOne);
exRoute.post("/two", AuthVal, ctrl.handleUploadProductTwo);
exRoute.post("/three", AuthVal, ctrl.handleUploadProductThree);
exRoute.post("/four", AuthVal, ctrl.handleUploadProductFour);

module.exports = exRoute;

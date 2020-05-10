const express = require("express");
const exRoute = express.Router();
const AuthVal = require("../../Middleware/Auth");
const ctrl = require("../../Controller/Admin/Report");

exRoute.get("/get", AuthVal, ctrl.handleGetAllReportedAds);
exRoute.post("/delete", AuthVal, ctrl.handleDeleteReportedAd);

module.exports = exRoute;

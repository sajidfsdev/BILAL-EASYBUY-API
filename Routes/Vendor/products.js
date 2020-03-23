const express = require("express");
const exRoute = express.Router();
const adminCtrl = require("./../../Controller/Admin/cat");
const AuthVal = require("./../../Middleware/AuthVendor");

exRoute.get("/getAllCats", adminCtrl.handleGetAllCats);

module.exports = exRoute;

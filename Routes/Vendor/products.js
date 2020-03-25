const express = require("express");
const exRoute = express.Router();
const adminCtrl = require("./../../Controller/Admin/cat");
const ctrl = require("./../../Controller/Vendor/products");
const AuthVal = require("./../../Middleware/AuthVendor");

exRoute.get("/getAllCats", adminCtrl.handleGetAllCats);
exRoute.post("/add", AuthVal, ctrl.handleAddProduct);

module.exports = exRoute;

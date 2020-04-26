const express = require("express");
const exRoute = express.Router();
const adminCtrl = require("./../../Controller/Admin/cat");
const ctrl = require("./../../Controller/Vendor/products");
const AuthVal = require("./../../Middleware/AuthVendor");

exRoute.get("/getAllCats", adminCtrl.handleGetAllCats);
exRoute.post("/add", AuthVal, ctrl.handleAddProduct);
exRoute.post("/edit", AuthVal, ctrl.handleEditProduct);
exRoute.post("/get", AuthVal, ctrl.handleGetAllMyProducts);

module.exports = exRoute;

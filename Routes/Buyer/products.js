const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Buyer/products");

exRoute.post("/getAllProducts", ctrl.handleGetAllProducts);

module.exports = exRoute;

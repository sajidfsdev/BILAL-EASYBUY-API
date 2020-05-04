const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/General/Products");

exRoute.get("/topRated", ctrl.handleGetFeaturedProducts);

module.exports = exRoute;

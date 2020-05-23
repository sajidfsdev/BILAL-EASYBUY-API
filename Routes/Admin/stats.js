const exRoute = require("express").Router();
const AuthVal = require("./../../Middleware/Auth");
const ctrl = require("./../../Controller/Admin/stats");

exRoute.get("/get", AuthVal, ctrl.handleGetStats);

module.exports = exRoute;

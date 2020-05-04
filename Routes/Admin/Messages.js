const express = require("express");
const exRoute = express.Router();
const AuthVal = require("../../Middleware/Auth");
const ctrl = require("../../Controller/Admin/Messages");

exRoute.post("/getUserMessages", AuthVal, ctrl.handleGetUserMessages);
exRoute.post("/deleteUserMessages", AuthVal, ctrl.handleDeleteUserMessages);

module.exports = exRoute;

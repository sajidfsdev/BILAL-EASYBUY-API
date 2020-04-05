const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Buyer/Proposal");
const AuthVal = require("./../../Middleware/AuthBuyer");

exRoute.post("/propose", AuthVal, ctrl.handlePropose);

exRoute.post("/getMyProposals", AuthVal, ctrl.handleGetMyProposals);

module.exports = exRoute;

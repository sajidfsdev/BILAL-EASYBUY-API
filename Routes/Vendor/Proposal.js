const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Vendor/Proposal");
const AuthVal = require("./../../Middleware/AuthVendor");

exRoute.post("/getMyProposals", AuthVal, ctrl.handleGetMyProposals);

exRoute.post("/update", AuthVal, ctrl.handleChangeProposalStatus);

module.exports = exRoute;

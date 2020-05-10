const express = require("express");
const exRoute = express.Router();
const AuthVal = require("../../Middleware/Auth");
const ctrl = require("../../Controller/Admin/Messages");

exRoute.post("/getUserMessages", AuthVal, ctrl.handleGetUserMessages);
exRoute.post("/deleteUserMessages", AuthVal, ctrl.handleDeleteUserMessages);
exRoute.post("/getBuyerMessages", AuthVal, ctrl.handleGetBuyerMessages);
exRoute.post("/replyBuyer", AuthVal, ctrl.handleReplyToBuyer);
exRoute.post("/getVendorMessages", AuthVal, ctrl.handleGetVendorMessages);
exRoute.post("/replyVendor", AuthVal, ctrl.handleReplyToVendor);

module.exports = exRoute;

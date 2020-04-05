const express = require("express");
const exRoute = express.Router();
const ctrl = require("./../../Controller/Buyer/products");
const AuthVal = require("./../../Middleware/AuthBuyer");

exRoute.post("/getAllProducts", ctrl.handleGetAllProducts);
exRoute.post("/addToCollaborators", AuthVal, ctrl.handleAddCollaborators);
exRoute.post(
  "/checkInCollaborator",
  AuthVal,
  ctrl.handleCheckAlreadyAddedInCollaborators
);
exRoute.post("/getAllCollaborators", AuthVal, ctrl.handleGetAllCollaborators);
exRoute.post("/deleteCollaborators", AuthVal, ctrl.handleDeleteCollaborations);

module.exports = exRoute;

const express = require("express");
const exRoute = express.Router();
const AuthVal = require("../../Middleware/Auth");
const ctrl = require("../../Controller/Admin/cat");

exRoute.post("/addCat", AuthVal, ctrl.handleAddCat);

exRoute.post("/addSubCat", AuthVal, ctrl.handleAddSubCat);

exRoute.post("/addSubSubCat", AuthVal, ctrl.handleAddSubSubCat);

exRoute.get("/getAllCats", AuthVal, ctrl.handleGetAllCats);

exRoute.post("/edit/cat", AuthVal, ctrl.handleEditCat);

exRoute.post("/edit/subCat", AuthVal, ctrl.handleEditSubCat);

exRoute.post("/edit/subSubCat", AuthVal, ctrl.handleEditSubSubCat);

exRoute.post("/delete/cat", AuthVal, ctrl.handleDeleteCat);

exRoute.post("/delete/subCat", AuthVal, ctrl.handleDeleteSubCat);

exRoute.post("/delete/subSubCat", AuthVal, ctrl.handleDeleteSubSubcat);

module.exports = exRoute;

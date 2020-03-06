const express=require('express');
const exRoute=express.Router();
const ctrl=require('../../Controller/Admin/Auth');

exRoute.post("/register",ctrl.handleRegister);

exRoute.post('/login',ctrl.handleLogin);

module.exports=exRoute;
const Schema=require('mongoose').Schema;
const AdminSchema=new Schema({

    fname:{
        type:String,
        required:true
    },

    lname:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    pic:{
        type:String,
        required:false
    }
});

module.exports=require('mongoose').model("Admin",AdminSchema);
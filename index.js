const express=require('express');
const config=require('config');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


//Route imports starts here.......
const AdminAuthRoute=require('./Routes/Admin/Auth');
const AdminCatRoute=require('./Routes/Admin/cat');
//Route imports ends here.........

//Middle ware imports starts here.....
const corsMiddleWare=require('./Middleware/cors');
//Middle ware imports ends here.......

//parsing incomming body starts.....
app.use(bodyParser.json());
//parsing incomming body ends here....


//Cors resolvers starts.....
app.use(corsMiddleWare);
//Cors resolvers ends.......


//Routes registering starts here.......
app.use("/admin/auth",AdminAuthRoute);
app.use("/admin/cat",AdminCatRoute);
//Routes registering ends here.........


//Handling 404 error.......
app.use((req,resp,next)=>{
  return resp.status(404).json({
    errorMessage:"404 Resource Does Not Exists"
  });
});
//Handling 404 error.......

////connection setup.......
mongoose
  .connect(config.get("db"), { useNewUrlParser: true,useUnifiedTopology: true })

  .then(result => {
    console.log("Listening at port ");

    //socket setup................
    // process.env.PORT
    const server=app.listen(3000);
    console.log("Server Activated Successfully");
  })

  .catch(err => {
    console.log(err.message);
  });
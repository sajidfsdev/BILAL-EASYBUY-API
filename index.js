const express = require("express");
const config = require("config");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressFileUpload = require("express-fileupload");

//Route imports starts here.......
const AdminAuthRoute = require("./Routes/Admin/Auth");
const AdminCatRoute = require("./Routes/Admin/cat");
const VendorAuthRoute = require("./Routes/Vendor/auth");
const VendorProductRoute = require("./Routes/Vendor/products");
const VendorUploadRoute = require("./Routes/Vendor/upload");
//Route imports ends here.........

//Middle ware imports starts here.....
const corsMiddleWare = require("./Middleware/cors");
//Middle ware imports ends here.......

//serving file statically....
app.use(express.static(`${__dirname}/uploads/vendor/products`));
//serving file statically....

//parsing incomming body starts.....
app.use(bodyParser.json());
//parsing incomming body ends here....

//Cors resolvers starts.....
app.use(corsMiddleWare);
//Cors resolvers ends.......

//Fileupload starts......
app.use(expressFileUpload());
//Fileupload ends........

//Routes registering starts here.......
app.use("/admin/auth", AdminAuthRoute);
app.use("/admin/cat", AdminCatRoute);
app.use("/vendor/auth", VendorAuthRoute);
app.use("/vendor/products", VendorProductRoute);
app.use("/vendor/upload", VendorUploadRoute);
//Routes registering ends here.........

//Handling 404 error.......
app.use((req, resp, next) => {
  return resp.status(404).json({
    errorMessage: "404 Resource Does Not Exists"
  });
});
//Handling 404 error.......

////connection setup.......
mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(result => {
    console.log("Listening at port ");

    //socket setup................
    // process.env.PORT
    const server = app.listen(process.env.PORT || 3005);
    console.log("Server Activated Successfully");
  })

  .catch(err => {
    console.log(err.message);
  });

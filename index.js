const express = require("express");
const config = require("config");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressFileUpload = require("express-fileupload");
const path = require("path");

//Route imports starts here.......
const AdminAuthRoute = require("./Routes/Admin/Auth");
const AdminCatRoute = require("./Routes/Admin/cat");
const AdminTrafficRoute = require("./Routes/Admin/Traffic");
const VendorAuthRoute = require("./Routes/Vendor/auth");
const VendorProductRoute = require("./Routes/Vendor/products");
const VendorUploadRoute = require("./Routes/Vendor/upload");
const vendorProposalRoute = require("./Routes/Vendor/Proposal");
const VendorConsignedRoute = require("./Routes/Vendor/Consigned");
const BuyerProductRoutes = require("./Routes/Buyer/products");
const BuyerAuthRoute = require("./Routes/Buyer/Auth");
const BuyerProposalRoute = require("./Routes/Buyer/proposal");
const BuyerConsignedRoute = require("./Routes/Buyer/Consigned");

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
app.use("/admin/traffic", AdminTrafficRoute);
app.use("/vendor/auth", VendorAuthRoute);
app.use("/vendor/products", VendorProductRoute);
app.use("/vendor/upload", VendorUploadRoute);
app.use("/vendor/proposal", vendorProposalRoute);
app.use("/vendor/consigned", VendorConsignedRoute);
app.use("/buyer/products", BuyerProductRoutes);
app.use("/buyer/auth", BuyerAuthRoute);
app.use("/buyer/proposal", BuyerProposalRoute);
app.use("/buyer/consigned", BuyerConsignedRoute);
//Routes registering ends here.........

//Handling 404 error.......
app.use((req, resp, next) => {
  return resp.status(404).json({
    errorMessage: "404 Resource Does Not Exists",
  });
});
//Handling 404 error.......

////connection setup.......
mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then((result) => {
    console.log("Listening at port ");

    //socket setup................
    // process.env.PORT
    const server = app.listen(process.env.PORT || 3005);
    console.log("Server Activated Successfully");
  })

  .catch((err) => {
    console.log(err.message);
  });

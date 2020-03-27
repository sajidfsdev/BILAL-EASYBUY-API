const ProductModel = require("./../../Model/Vendor/Product");

exports.handleGetAllProducts = async (req, resp, next) => {
  //try catch starts...
  try {
    const res = await ProductModel.find().populate("vendorId");
    if (res) {
      return resp.status(200).json({
        data: res
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Network Error"
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message
    });
  }
  //try catch ends.....
}; //.................................Get All Products

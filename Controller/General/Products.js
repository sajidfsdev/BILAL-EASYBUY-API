const ProductModel = require("./../../Model/Vendor/Product");

exports.handleGetFeaturedProducts = async (req, resp, next) => {
  try {
    const res = await ProductModel.find().populate("vendorId");
    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Load Products Due To Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //...................handle get featured products

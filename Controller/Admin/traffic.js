const BuyerModel = require("./../../Model/Buyer/Auth");
const VendorModel = require("./../../Model/Vendor/Auth");
const ProductModel = require("./../../Model/Vendor/Product");

exports.handleGetAllTraffic = async (req, resp, next) => {
  try {
    const buyerRes = await BuyerModel.find();
    if (buyerRes) {
      const vendorRes = await VendorModel.find();

      if (vendorRes) {
        return resp.status(200).json({
          buyerTraffic: buyerRes,
          vendorTraffic: vendorRes,
        });
      } else {
        return resp.status(500).json({
          errorMessage: "Failed to Get Vendor Traffic",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Get Buyer Traffic",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //.................handle get all traffic

exports.handleUpdateAccountStatus = async (req, resp, next) => {
  const { active, _id, type } = req.body;

  const model = type === "BUYER" ? BuyerModel : VendorModel;

  try {
    const res = await model.findOneAndUpdate({ _id }, { active });

    if (res) {
      return resp.status(200).json({
        successMessage: "Account Status Updated successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Update Account Status",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //.......................Handle Update Account Status

exports.handleLoadVendorAds = async (req, resp, next) => {
  const { vendorId } = req.body;

  try {
    const res = await ProductModel.find({ vendorId });

    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed to load Ads Info ",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //..................handle load vendor ads

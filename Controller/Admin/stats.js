const VendorModel = require("./../../Model/Vendor/Auth");
const BuyerModel = require("./../../Model/Buyer/Auth");
const ConsignedModel = require("./../../Model/Buyer/ConsignedInstallments");

exports.handleGetStats = async (req, resp, next) => {
  //try catch starts...
  try {
    const VendorNumbers = await VendorModel.find();
    if (VendorNumbers) {
      const BuyerNumbers = await BuyerModel.find();

      if (BuyerNumbers) {
        const res = await ConsignedModel.find();

        if (res) {
          console.log("Data retrieved");
          console.log(res);
          return resp.status(200).json({
            vendors: VendorNumbers.length,
            buyers: BuyerNumbers.length,
            consigned: res,
          });
        } else {
          return resp.status(500).json({
            errorMessage: "Failed To Retrieve Stats Info",
          });
        }
      } else {
        return resp.status(500).json({
          errorMessage: "Failed To Retrieve Stats Info",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Retrieve Stats Info",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.....
}; //......................handle get stats

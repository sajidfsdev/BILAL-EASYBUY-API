const ConsignedModel = require("./../../Model/Buyer/ConsignedInstallments");

exports.handleGetConsigned = async (req, resp, next) => {
  const vendorId = req.id;
  const status = req.body.status;

  try {
    const res = await ConsignedModel.find({
      vendorId,
      status,
    }).populate("buyerId");
    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Network Error Has Occurred",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //.........................Handle get pending

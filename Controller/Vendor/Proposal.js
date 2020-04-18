const ProposalModel = require("./../../Model/Buyer/ProposedInstallments");

exports.handleGetMyProposals = async (req, resp, next) => {
  const vendorId = req.id;
  const status = "PENDING";

  //try catch starts....
  try {
    const res = await ProposalModel.find({ vendorId, status })
      .populate("productId")
      .populate("buyerId")
      .exec();

    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Network error has occurred",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.......
}; //....................................Handle get my proposals

exports.handleChangeProposalStatus = async (req, resp, next) => {
  const { id, proposal } = req.body;

  try {
    const res = await ProposalModel.findOneAndUpdate(
      { _id: id },
      { ...proposal }
    );
    if (res) {
      return resp.status(200).json({
        successMessage: "Updated syccessfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Network Error Occurred",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //................................Handle change status...

const Proposal = require("./../../Model/Buyer/ProposedInstallments");

exports.handlePropose = async (req, resp, next) => {
  const { vendorId, productId, installmentPlan, status } = req.body;
  const buyerId = req.id;

  //try catch starts.....
  try {
    const proposal = new Proposal({
      buyerId,
      vendorId,
      productId,
      installmentPlan,
      status,
    });
    const res = await proposal.save();

    if (res) {
      return resp.status(200).json({
        successMessage: "Proposal proposed successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Network Error Occurred While Saving Info",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.......
}; //............................Handle propose ends

exports.handleGetMyProposals = async (req, resp, next) => {
  const buyerId = req.id;
  const productId = req.body.productId;

  //try catch starts....
  try {
    const res = await Proposal.find({ buyerId, productId });
    if (res) {
      return resp.status(200).json({
        data: res,
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
  //try catch ends......
}; //..........................Handle get my proposal

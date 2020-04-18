const ConsignedModel = require("./../../Model/Buyer/ConsignedInstallments");
const ProposalModel = require("./../../Model/Buyer/ProposedInstallments");
const CollaboratorsModel = require("./../../Model/Buyer/Collaborators");
const mongoose = require("mongoose");

exports.handleRequestConsignment = async (req, resp, next) => {
  console.log("Handle Request Consignment Called");
  console.log(req.body);
  const productId = req.body.productId;
  const buyerId = req.id;

  try {
    const checking = await ConsignedModel.findOne({ productId, buyerId });
    if (checking) {
      return resp.status(500).json({
        errorMessage: "This product is already in your consigned List",
      });
    } else {
      const Consignment = new ConsignedModel({
        buyerId: req.id,
        vendorId: req.body.vendorId,
        status: req.body.status,
        installmentPlan: req.body.installmentPlan,
        product: req.body.product,
        productId: req.body.productId,
        date: req.body.date,
      });
      const res = await Consignment.save();

      if (res) {
        const delColl = await CollaboratorsModel.findOneAndDelete({
          buyerId: req.id,
          productId: req.body.productId,
        });
        if (delColl) {
          const delProp = await ProposalModel.deleteMany({
            buyerId: req.id,
            productId: req.body.productId,
          });
          if (delProp) {
            return resp.status(200).json({
              successMessage: "Consignment Added Successfully",
            });
          } else {
            return resp.status(500).json({
              errorMessage: "Failed To Delete Proposals",
            });
          }
        } else {
          return resp.status(500).json({
            errorMessage: "Failed To Delete Collaborators",
          });
        }

        //.................................................end
      } else {
        return resp.status(500).json({
          errorMessage: "Network Error Has Occurred. Please try again",
        });
      }
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //.............................Handle request consignment ends...

exports.handleFetchConsignments = async (req, resp, next) => {
  const buyerId = req.id;

  try {
    const res = await ConsignedModel.find({ buyerId }).populate("vendorId");
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
}; //......................................Handle Fetch consignments

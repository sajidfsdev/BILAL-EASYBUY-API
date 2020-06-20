const ProductModel = require("./../../Model/Vendor/Product");
const CollaboratorModel = require("./../../Model/Buyer/Collaborators");
const ConsignedModel = require("./../../Model/Buyer/ConsignedInstallments");

exports.handleGetAllProducts = async (req, resp, next) => {
  //try catch starts...
  try {
    const res = await ProductModel.find().populate("vendorId");
    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.....
}; //.................................Get All Products

exports.handleCheckAlreadyAddedInCollaborators = async (req, resp, next) => {
  const buyerId = re.id;
  const productId = req.body.productId;
  try {
    //checking pre available starts....
    const dup = await CollaboratorModel.findOne({ buyerId, productId });
    if (dup) {
      return resp.status(500).json({
        errorMessage: "This Product Already Exists In Your Collaborator List",
      });
    } else {
      return resp.status(200).json({
        successMessage: "Not Present In Collaborator",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //...................................Handle already added ends..

exports.handleAddCollaborators = async (req, resp, next) => {
  console.log("Adeed to collaborators called");
  const buyerId = req.id;
  const productId = req.body.productId;
  console.log(buyerId);
  console.log(productId);
  try {
    //checking pre available starts....
    const dup = await CollaboratorModel.findOne({ buyerId, productId });
    if (dup) {
      return resp.status(500).json({
        errorMessage: "This Product Already Exists In Your Collaborator List",
      });
    } else {
      const dupConsigned = await ConsignedModel.findOne({ $and: [{ buyerId }, { productId }, { status: { $not: /^COMPLETED$/ } }] });
      if (dupConsigned) {
        return resp.status(500).json({
          errorMessage: "This Product Already Exists In Your Consignments List",
        });
      }
      else {
        const newCollaboration = new CollaboratorModel({
          buyerId,
          productId,
        });

        const res = await newCollaboration.save();
        if (res) {
          return resp.status(200).json({
            successMessage: "Product Added successfully",
          });
        } else {
          return resp.status(500).json({
            errorMessage: "Network error occurred",
          });
        }

      }
      // const newCollaboration = new CollaboratorModel({
      //   buyerId,
      //   productId,
      // });

      // const res = await newCollaboration.save();
      // if (res) {
      //   return resp.status(200).json({
      //     successMessage: "Product Added successfully",
      //   });
      // } else {
      //   return resp.status(500).json({
      //     errorMessage: "Network error occurred",
      //   });
      // }
    }
    //checking pre-available ends......
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //..............................................Handle Add Collabotayors

exports.handleGetAllCollaborators = async (req, resp, next) => {
  const buyerId = req.id;

  //try catch starts...
  try {
    const res = await CollaboratorModel.find({ buyerId })
      .populate({
        path: "productId",
        populate: {
          path: "vendorId",
          model: "Vendor",
        },
      })
      .exec();
    // const res = await CollaboratorModel.find({ buyerId })
    //   .populate("productId")
    //   .populate("vendorId")
    //   .exec();
    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Facing Network Issue",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.....
};

exports.handleDeleteCollaborations = async (req, resp, next) => {
  const id = req.id;
  const productId = req.body.productId;

  //try catch starts.......
  try {
    const res = await CollaboratorModel.findOneAndDelete({
      buyerId: id,
      productId: productId,
    });

    if (res) {
      return resp.status(200).json({
        successMessage: "Deleted Successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.........
}; //....................................................

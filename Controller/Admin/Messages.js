const UserMessagesModel = require("./../../Model/Admin/UserMessages");
const BuyerMessageModel = require("./../../Model/Buyer/Messages");
const VendorMessageModel = require("./../../Model/Vendor/Messages");

exports.handleGetUserMessages = async (req, resp, next) => {
  console.log("Reached at controller messages");
  try {
    const res = await UserMessagesModel.find();

    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Load User Messges",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //..............................Handle get user messages

exports.handleDeleteUserMessages = async (req, resp, next) => {
  const { _id } = req.body;

  try {
    const res = await UserMessagesModel.findByIdAndDelete(_id);
    if (res) {
      return resp.status(200).json({
        successMessage: "Messages delete successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Delete Messages Due To Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //.............handle delete user messages

exports.handleGetBuyerMessages = async (req, resp, next) => {
  try {
    const res = await BuyerMessageModel.find({ status: "PENDING" }).populate(
      "buyerId"
    );

    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Load Messages due to Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //...................handle get Buyer messages

exports.handleGetVendorMessages = async (req, resp, next) => {
  try {
    const res = await VendorMessageModel.find({ status: "PENDING" }).populate(
      "vendorId"
    );

    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Load Messages due to Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //...................handle get Buyer messages

exports.handleReplyToBuyer = async (req, resp, next) => {
  const { _id, reply } = req.body;

  try {
    const res = await BuyerMessageModel.findOneAndUpdate(
      { _id: _id },
      { reply: reply, status: "REPLIED" }
    );

    if (res) {
      return resp.status(200).json({
        successMessage: "Message Replied Successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Reply To Buyer Due To Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //...............Handle reply to buyer starts.....

exports.handleReplyToVendor = async (req, resp, next) => {
  const { _id, reply } = req.body;

  try {
    const res = await VendorMessageModel.findOneAndUpdate(
      { _id: _id },
      { reply: reply, status: "REPLIED" }
    );

    if (res) {
      return resp.status(200).json({
        successMessage: "Message Replied Successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Reply To Vendor Due To Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //...............Handle reply to Vendor starts.....

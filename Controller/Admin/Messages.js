const UserMessagesModel = require("./../../Model/Admin/UserMessages");

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

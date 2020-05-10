const MessageModel = require("./../../Model/Buyer/Messages");

exports.handleSendMessages = async (req, resp, next) => {
  const { title, message, date } = req.body;
  const buyerId = req.id;

  try {
    const newMessage = new MessageModel({ buyerId, title, message, date });

    const res = await newMessage.save();

    if (res) {
      return resp.status(200).json({
        successMessage: "Message send successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Save Message Due To Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //...............handle send messages

exports.handleGetMessages = async (req, resp, next) => {
  const buyerId = req.id;

  try {
    const res = await MessageModel.find({ buyerId });

    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Load Messages",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //.......................Handle get messages

exports.handleDeleteMessages = async (req, resp, next) => {
  const { _id } = req.body;

  try {
    const res = await MessageModel.findByIdAndDelete(_id);
    if (res) {
      return resp.status(200).json({
        successMessage: "Message Deleted Successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed to delete Messages Due To Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //..................handle delete messages

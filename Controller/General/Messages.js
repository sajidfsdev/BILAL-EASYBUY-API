const MessageModel = require("./../../Model/Admin/UserMessages");

exports.handleSendMessage = async (req, resp, next) => {
  const { name, email, message } = req.body;

  try {
    const Message = new MessageModel({ name, email, message });
    const res = await Message.save();

    if (res) {
      return resp.status(200).json({
        successMessage: "Your Message Has Been Send To Admin",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Send Message To Admin.",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //..................Handle send message

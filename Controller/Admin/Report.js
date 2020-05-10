const ReportModel = require("./../../Model/Admin/Report");

exports.handleGetAllReportedAds = async (req, resp, next) => {
  try {
    const res = await ReportModel.find().populate("buyerId");

    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Could Not Get Reported Ads Due To Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //..........................handle Get All Reported Ads

exports.handleDeleteReportedAd = async (req, resp, next) => {
  const _id = req.body._id;

  try {
    const res = await ReportModel.findByIdAndDelete(_id);

    if (res) {
      return resp.status(200).json({
        successMessage: "Deleted successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Delete Reported Ad",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //........................Handle delete reported ad

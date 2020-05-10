const ReportModel = require("./../../Model/Admin/Report");

exports.handleReportAbuse = async (req, resp, next) => {
  const { product, reason } = req.body;
  const buyerId = req.id;
  try {
    const dup = await ReportModel.findOne({ product, buyerId });
    if (dup) {
      return resp.status(500).json({
        errorMessage: "This Advertisement has already been reported by You",
      });
    } else {
      const Report = new ReportModel({ product, buyerId, reason });

      const save = await Report.save();

      if (save) {
        return resp.status(200).json({
          successMessage: "Ad has been reported to admin successfullt",
        });
      } else {
        return resp.status(500).json({
          errorMessage: "Failed To Report To Admin Due To Network Error",
        });
      }
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //...................Handle report Abuse

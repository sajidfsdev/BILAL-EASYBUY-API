const ConsignedModel = require("./../../Model/Buyer/ConsignedInstallments");

exports.handleGetConsigned = async (req, resp, next) => {
  const vendorId = req.id;
  const status = req.body.status;

  try {
    const res = await ConsignedModel.find({
      vendorId,
      status,
    }).populate("buyerId");
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
}; //.........................Handle get pending

exports.handleSetStatus = async (req, resp, next) => {
  const id = req.body.id;
  const status = req.body.status;
  console.log("REACHECD AT STAUS UPDATION");
  console.log(req.body.status);
  console.log("REACHECD AT STAUS UPDATION");
  console.log("REACHECD AT STAUS UPDATION");
  console.log("REACHECD AT STAUS UPDATION");

  console.log("REACHECD AT STAUS UPDATION");

  console.log("REACHECD AT STAUS UPDATION");

  try {
    //Testing Area starts....
    const res = await ConsignedModel.findOne({ _id: id });
    if (res) {
      let downDate = "";
      let installmentsDates = [];
      let checkedArray = [];

      res.installmentPlan.installmentPlan.forEach((elem) => {
        checkedArray.push(false);
        installmentsDates.push("");
      });
      res.status = status;
      res.downCheck = false;
      res.checkedArray = [...checkedArray];
      res.downDate = downDate;
      res.installmentsDates = [...installmentsDates];
      if (status === "REJECTED") {
        console.log("STATUS REJECTED DETECTED");
        res.reason = req.body.reason;
        console.log(req.body.status);
      }
      const saveRes = await res.save();
      if (saveRes) {
        return resp.status(200).json({
          successMessage: "Stataus updated successfully",
        });
      } else {
        return resp.status(500).json({
          errorMessage: "Failed To Save Updation",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Update Data Could Not Find Resource",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //..........................handle set status

exports.handleUpdateConsignment = async (req, resp, next) => {
  const { downCheck, checkedArray, downDate, installmentsDates, id } = req.body;

  try {
    const res = await ConsignedModel.findOne({ _id: id });
    if (res) {
      res.downCheck = downCheck;
      res.checkedArray = [...checkedArray];
      res.downDate = downDate;
      res.installmentsDates = [...installmentsDates];
      const save = await res.save();
      if (save) {
        return resp.status(200).json({
          successMessage: "Updated successfully",
        });
      } else {
        console.log("Not saved");
        return resp.status(500).json({
          errorMessage: "Failed To Update  Request",
        });
      }
    } else {
      console.log("Not Found");
      return resp.status(500).json({
        errorMessage: "Failed To Update  Request",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //..............................handle update consignment0

exports.handleCompleteAgreement = async (req, resp, next) => {
  const { status, id, date, downDate, installmentsDates } = req.body;

  //try catch starts...
  try {
    const res = await ConsignedModel.findOne({ _id: id });

    if (res) {
      res.status = status;
      res.date = date;
      res.downDate = downDate;
      res.installmentsDates = installmentsDates;
      const saveRes = await res.save();

      if (saveRes) {
        return resp.status(200).json({
          successMessage: "Record Updated successfully",
        });
      } else {
        return resp.status(500).json({
          errorMessage: "Could Not Save Record",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Could Not Update Status",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.....
}; //................................................Handle complete Agreement

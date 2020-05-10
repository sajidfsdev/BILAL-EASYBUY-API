const BuyerModel = require("./../../Model/Buyer/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.handleRegistration = async (req, resp, next) => {
  //parsing req body......
  let { name, email, city, contact, password } = req.body;

  //logging........
  //console.log(req.body);

  //conversions.......
  name = name.toUpperCase();
  city = city.toUpperCase();

  //logging....
  //console.log(fname,lname);

  //Encrypting password starts here....
  try {
    //duplication checking starts.....
    const dupres = await BuyerModel.findOne({ email });
    if (dupres) {
      return resp.status(500).json({
        errorMessage: "This email address already exists",
      });
    }

    //duplication checking ends.......
    const bcryptres = await bcrypt.hash(password, 12);
    if (bcryptres) {
      //Password Hashed Successfully........
      const Buyer = new BuyerModel({
        name: name,
        email: email,
        city: city,
        contact: contact,
        password: bcryptres,
        active: true,
      });

      const saveres = await Buyer.save();

      if (saveres) {
        return resp.status(201).json({
          successMessage: "Buyer Has Been Added Successfully",
        });
      } else {
        return resp.status(500).json({
          errorMessage: "Error Occurred While Saving Information",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Error Occurred While Processing Password Authentication",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //......................................Handle registrations ends here

//Handle Login Starts Here..............................................
exports.handleLogin = async (req, resp, next) => {
  //extracting info....
  const { email, password } = req.body;

  //logging.....
  console.log("Buyer Login");
  console.log(email);
  console.log(password);

  //verifying starts.....
  try {
    const findres = await BuyerModel.findOne({ email });

    if (findres) {
      //comparing password.........
      const compareres = await bcrypt.compare(password, findres.password);

      if (compareres === true) {
        //Preparing JWT Token starts.......
        console.log("About to login ");

        if (!findres.active) {
          return resp.status(500).json({
            errorMessage:
              "Your account has been blocked by Admin. Kindly contact admin for further information",
          });
        }

        const payload = {
          id: findres._id,
          email: findres.email,
          name: findres.name,
          type: "Buyer",
        };
        jwt.sign(payload, config.get("secret"), (err, token) => {
          if (err) {
            return resp.status(500).json({
              errorMessage: "Error occurred while processing token",
            });
          } else {
            return resp.status(200).json({
              successMessage: "Logged In Successfully",
              token: token,
              name: findres.name,
              email: findres.email,
            });
          }
        });
        //Preparing JWT Token ends here....
      } else {
        return resp.status(500).json({
          errorMessage: "Sorry Username Or Password Is Incorrect",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Sorry Username Or Password Is Incorrect",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
};
////...........................................Handle Login Ends Here...

exports.handleGetProfileInfo = async (req, resp, next) => {
  const _id = req.id;
  try {
    const res = await BuyerModel.findById(_id);

    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Load Resources Due To Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //.........................................Handle Get Profile Info

exports.handleEditProfileInfo = async (req, resp, next) => {
  let { name, email, city, contact } = req.body;
  const _id = req.id;
  try {
    const saveRes = await BuyerModel.findOneAndUpdate(
      { _id },
      {
        name,
        email,
        city,
        contact,
      }
    );

    if (saveRes) {
      return resp.status(200).json({
        successMessage: "Profile Updated Successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Edit Info",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //.....................................Handle edit peofile info

exports.handleEditPassword = async (req, resp, next) => {
  let { password, oldPassword } = req.body;
  const _id = req.id;

  try {
    const res = await BuyerModel.findById(_id);

    if (res) {
      const compareres = await bcrypt.compare(oldPassword, res.password);

      if (compareres === true) {
        const bcryptres = await bcrypt.hash(password, 12);
        if (bcryptres) {
          res.password = bcryptres;
          const saveRes = await res.save();
          if (saveRes) {
            return resp.status(200).json({
              successMessage: "Password Updated Successfully",
            });
          } else {
            return resp.status(500).json({
              errorMessage: "Failed To Update Password",
            });
          }
        } else {
          return resp.status(500).json({
            errorMessage: "Failed To Hash Password",
          });
        }
      } else {
        return resp.status(500).json({
          errorMessage: "You have typed incorrect current Password",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Get Profile Info",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //.....................................Handle edit Password

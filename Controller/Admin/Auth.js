const AdminAuthModel = require("../../Model/Admin/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//AAuth related methods starts here........
//Must Also needs to check Duplication.....

exports.handleRegister = async (req, resp, next) => {
  //parsing req body......
  let { fname, lname, email, password, pic } = req.body;

  //logging........
  //console.log(req.body);

  //conversions.......
  fname = fname.toUpperCase();
  lname = lname.toUpperCase();

  //logging....
  //console.log(fname,lname);

  //Encrypting password starts here....
  try {
    const bcryptres = await bcrypt.hash(password, 12);
    if (bcryptres) {
      //Password Hashed Successfully........
      const Admin = new AdminAuthModel({
        fname: fname,
        lname: lname,
        email: email,
        password: bcryptres,
        pic: pic,
      });

      const saveres = await Admin.save();

      if (saveres) {
        return resp.status(201).json({
          successMessage: "Admin Has Been Added Successfully",
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
}; //..........................................Handle Register ends here.....

//Handle Login Starts Here..............................................
exports.handleLogin = async (req, resp, next) => {
  //extracting info....
  const { email, password } = req.body;

  //logging.....
  console.log(email);
  console.log(password);

  //verifying starts.....
  try {
    const findres = await AdminAuthModel.findOne({ email });

    if (findres) {
      //comparing password.........
      const compareres = await bcrypt.compare(password, findres.password);

      if (compareres === true) {
        //Preparing JWT Token starts.......
        const payload = {
          id: findres.id,
          email: findres.email,
          fname: findres.fname,
          lname: findres.lname,
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
              fname: findres.fname,
              lname: findres.lname,
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
  try {
    const res = await AdminAuthModel.findOne();

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
  let { fname, lname, email } = req.body;
  //conversions.......
  fname = fname.toUpperCase();
  lname = lname.toUpperCase();

  try {
    // const bcryptres = await bcrypt.hash(password, 12);
    // if (bcryptres) {
    const saveRes = await AdminAuthModel.findOneAndUpdate({
      fname: fname,
      lname: lname,
      email: email,
    });

    if (saveRes) {
      return resp.status(200).json({
        successMessage: "Profile Updated Successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Failed To Edit Info",
      });
    }
    // } else {
    //   return resp.status(500).json({
    //     errorMessage: "Failed To Hash Password",
    //   });
    // }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //.....................................Handle edit peofile info

exports.handleGetProfileInfo = async (req, resp, next) => {
  try {
    const res = await AdminAuthModel.findOne();

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

exports.handleEditPassword = async (req, resp, next) => {
  let { password, oldPassword } = req.body;

  try {
    const res = await AdminAuthModel.findOne();

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

const VendorModel = require("./../../Model/Vendor/Auth");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

exports.handleRegisterVendor = async (req, resp, next) => {
  let { name, email, title, city, address, contact, password } = req.body;

  name = name.toUpperCase();
  title = title.toUpperCase();
  city = city.toUpperCase();
  address = address.toUpperCase();

  try {
    const validateRes = await VendorModel.findOne({ email: email });

    if (validateRes) {
      return resp.status(500).json({
        errorMessage: "This Email Already Exists",
      });
    }

    const validateTitleRes = await VendorModel.findOne({ title: title });

    if (validateTitleRes) {
      return resp.status(500).json({
        errorMessage: "Shop With This title already exists",
      });
    }

    const bcryptres = await bcrypt.hash(password, 12);
    if (bcryptres) {
      const newVendor = await new VendorModel({
        name: name,
        email: email,
        title: title,
        city: city,
        address: address,
        contact: contact,
        password: bcryptres,
        active: true,
      });

      const res = await newVendor.save();

      if (res) {
        return resp.status(200).json({
          successMessage: "Registered Successfully",
        });
      } else {
        return resp.status(500).json({
          errorMessage: "Network Error",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Error occurred while processing password",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
};

//Handle Login Starts Here..............................................
exports.handleLogin = async (req, resp, next) => {
  //extracting info....
  const { email, password } = req.body;

  //logging.....
  console.log(email);
  console.log(password);

  //verifying starts.....
  try {
    const findres = await VendorModel.findOne({ email });

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
              type: "Vendor",
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

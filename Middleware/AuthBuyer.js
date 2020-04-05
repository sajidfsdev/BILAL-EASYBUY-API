const jwt = require("jsonwebtoken");
const config = require("config");

const AuthValidator = (req, resp, next) => {
  console.log("REACHED AT AUTH VAL BUYER");
  const token = req.header(config.get("buyerHeader"));

  if (token === null) {
    return resp.status(500).json({
      errorMessage: "Reuest Authentication Failed"
    });
  }

  //token  exists.......
  //console.log("Token received");
  //console.log(token);

  //try catch starts here................
  try {
    const res = jwt.verify(token, config.get("secret"));

    if (res === null) {
      return resp.status(500).json({
        errorMessage: "Request Authentication Failed"
      });
    }

    console.log("TOKEN HAS BEEN DECODED SUCCESSFULLY");
    //console.log(res);

    //Request Assignment.......
    req.id = res.id;
    req.name = res.name;
    req.email = res.email;

    next();
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message
    });
  }
  //try catch ends here..................
}; //....................................

module.exports = AuthValidator;

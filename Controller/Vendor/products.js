const ProductModel = require("./../../Model/Vendor/Product");

exports.handleEditProduct = async (req, resp, next) => {
  console.log("Handle edit product called");
  console.log(req.body);
  let {
    name,
    price,
    cat,
    subCat,
    subSubCat,
    desc,
    att,
    images,
    installmentPlan,
    id,
  } = req.body;
  const vendorId = req.id;

  name = name.toUpperCase();

  //try catch starts.......
  try {
    const find = await ProductModel.findById(id);
    if (find) {
      console.log("Found");
      find.name = name;
      find.price = price;
      find.cat = cat;
      find.subCat = subCat;
      find.subSubCat = subSubCat;
      find.desc = desc;
      find.att = att;
      find.images = images;
      find.installmentPlan = installmentPlan;
      find.vendorId = vendorId;

      const res = await find.save();

      if (res) {
        console.log("Saved succesfully");
        return resp.status(200).json({
          successMessage: "Product Added Successfully",
        });
      } else {
        console.log("Unable to save product info");
        return resp.status(500).json({
          errorMessage: "Unable To Save Product Information",
        });
      }
    } else {
      console.log("Could not find product");
      return resp.status(500).json({
        errorMessage: "Could Not Find Product ",
      });
    }

    //..................................
    //...................................
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.........
}; //.............................................Handle Add Products

exports.handleAddProduct = async (req, resp, next) => {
  let {
    name,
    price,
    cat,
    subCat,
    subSubCat,
    desc,
    att,
    images,
    installmentPlan,
  } = req.body;
  const vendorId = req.id;

  name = name.toUpperCase();

  //try catch starts.......
  try {
    const dup = await ProductModel.findOne({ name });
    if (dup) {
      return resp.status(500).json({
        errorMessage: "Product With This Name Already Exist",
      });
    }

    const NewProduct = new ProductModel({
      name,
      price,
      cat,
      subCat,
      subSubCat,
      desc,
      att,
      images,
      installmentPlan,
      vendorId,
    });

    const res = await NewProduct.save();

    if (res) {
      return resp.status(200).json({
        successMessage: "Product Added Successfully",
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Unable To Save Product Information",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.........
}; //.............................................Handle Add Products

exports.handleGetAllMyProducts = async (req, resp, next) => {
  const vendorId = req.id;

  //try catch starts.....
  try {
    const res = await ProductModel.find({ vendorId });
    if (res) {
      return resp.status(200).json({
        data: res,
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Could Not Get Products Due To Network Error",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.......
}; //...............................................Handle Get My Products

const ProductModel = require("./../../Model/Vendor/Product");

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
    installmentPlan
  } = req.body;
  const vendorId = req.id;

  name = name.toUpperCase();

  //try catch starts.......
  try {
    const dup = await ProductModel.findOne({ name });
    if (dup) {
      return resp.status(500).json({
        errorMessage: "Product With This Name Already Exist"
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
      vendorId
    });

    const res = await NewProduct.save();

    if (res) {
      return resp.status(200).json({
        successMessage: "Product Added Successfully"
      });
    } else {
      return resp.status(500).json({
        errorMessage: "Unable To Save Product Information"
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message
    });
  }
  //try catch ends.........
}; //.............................................Handle Add Products

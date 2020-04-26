const catModel = require("../../Model/Admin/cat");
const subCatModel = require("../../Model/Admin/subCat");
const subSubCatModel = require("../../Model/Admin/subSubCat");
const ProductModel = require("../../Model/Vendor/Product");

exports.handleAddCat = async (req, resp, next) => {
  let { cat } = req.body;

  //Conversions........
  cat = cat.toUpperCase();

  //try catch starts here.................
  try {
    //first checking duplication possibility......
    const dupRes = await catModel.findOne({ cat });

    if (dupRes) {
      return resp.status(500).json({
        errorMessage: "This Category Already Exists",
      });
    }

    //No Duplication Found......

    const newCat = new catModel({ type: "cat", cat: cat, prods: 0 });

    const saveres = await newCat.save();

    if (saveres) {
      return resp.status(201).json(saveres);
    } else {
      return resp.status(500).json({
        errorMessage: "Error Occurred While Saving Category Information",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends here...................
}; //....................................handle add cat ends...

exports.handleAddSubCat = async (req, resp, next) => {
  let { cat, subCat } = req.body;

  //Conversions........
  cat = cat.toUpperCase();
  subCat = subCat.toUpperCase();

  //try catch starts here.................
  try {
    //first checking duplication possibility......
    const dupRes = await subCatModel.findOne({ cat, subCat });

    if (dupRes) {
      return resp.status(500).json({
        errorMessage: "This Sub-Category Already Exists",
      });
    }

    //No Duplication Found......

    const newSubCat = new subCatModel({
      type: "subCat",
      cat: cat,
      subCat: subCat,
      prods: 0,
    });

    const saveres = await newSubCat.save();

    if (saveres) {
      return resp.status(201).json(saveres);
    } else {
      return resp.status(500).json({
        errorMessage: "Error Occurred While Saving Sub-Category Information",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends here...................
}; //....................................handle add Sub-cat ends...

exports.handleAddSubSubCat = async (req, resp, next) => {
  let { cat, subCat, subSubCat } = req.body;

  //Conversions........
  cat = cat.toUpperCase();
  subCat = subCat.toUpperCase();
  subSubCat = subSubCat.toUpperCase();

  //try catch starts here.................
  try {
    //first checking duplication possibility......
    const dupRes = await subSubCatModel.findOne({ cat, subCat, subSubCat });

    if (dupRes) {
      return resp.status(500).json({
        errorMessage: "This Sub-Sub-Category Already Exists",
      });
    }

    //No Duplication Found......

    const newSubSubCat = new subSubCatModel({
      type: "subSubCat",
      cat: cat,
      subCat: subCat,
      subSubCat,
      subSubCat,
      prods: 0,
    });

    const saveres = await newSubSubCat.save();

    if (saveres) {
      return resp.status(201).json(saveres);
    } else {
      return resp.status(500).json({
        errorMessage:
          "Error Occurred While Saving Sub-Sub-Category Information",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends here...................
}; //....................................handle add SubSubcat ends...

//Handle Get All Cats Starts Here...................................
exports.handleGetAllCats = async (req, resp, next) => {
  //try catch starts here.....
  try {
    const catRes = await catModel.find();
    if (catRes) {
      const subCatRes = await subCatModel.find();

      if (subCatRes) {
        const subSubCatRes = await subSubCatModel.find();

        if (subSubCatRes) {
          return resp.status(200).json({
            cat: catRes,
            subCat: subCatRes,
            subSubCat: subSubCatRes,
          });
        } else {
          return resp.status(500).json({
            errorMessage: "Error Occurred While Fetching Categories",
          });
        }
      } else {
        return resp.status(500).json({
          errorMessage: "Error Occurred While Fetching Categories",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Error Occurred While Fetching Categories",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends here.......
};
//.....................................handle get all cats ends here...

exports.handleEditCat = async (req, resp, next) => {
  let { cat, id, oldValue } = req.body;
  cat = cat.toUpperCase();
  oldValue = oldValue.toUpperCase();
  try {
    const res = await catModel.findById(id);

    if (res) {
      res.cat = cat;
      const saveRes = await res.save();
      if (saveRes) {
        //Modifying cat ref in cat and subCat starts....
        const subCatRes = await subCatModel.updateMany(
          { cat: oldValue },
          { cat: cat }
        );
        if (subCatRes) {
          const subSubCatRes = await subSubCatModel.updateMany(
            { cat: oldValue },
            { cat: cat }
          );
          if (subSubCatRes) {
            //Updating products that have cat old
            const productUpdate = await ProductModel.updateMany(
              { cat: oldValue },
              { cat: cat }
            );
            if (productUpdate) {
              return resp.status(200).json({
                successMessage: "Category Edited successfully",
              });
            } else {
              return resp.status(500).json({
                errorMessage:
                  "Category Renamed But Failed To Update Linked Products",
              });
            }
            //...................................
            // return resp.status(200).json({
            //   successMessage: "Category Added Successfully",
            // });
          } else {
            return resp.status(500).json({
              errorMessage: "Failed To Update Sub Sub Children",
            });
          }
        } else {
          return resp.status(500).json({
            errorMessage: "Failed To Update Category Sub Children",
          });
        }
        //Modifying cat ref in cat and subCat ends......
      } else {
        return resp.status(500).json({
          errorMessage: "Could Not Save Updated Information",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Could Not Find Category",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //......................Handle Edit Cat

exports.handleEditSubCat = async (req, resp, next) => {
  let { subCat, oldValue, id } = req.body;

  subCat = subCat.toUpperCase();
  oldValue = oldValue.toUpperCase();

  try {
    const res = await subCatModel.findById(id);

    if (res) {
      res.subCat = subCat;
      const saveRes = await res.save();
      if (saveRes) {
        //Updating sub sub cat starts....
        const subSubCatRes = await subSubCatModel.updateMany(
          { subCat: oldValue },
          { subCat: subCat }
        );
        if (subSubCatRes) {
          return resp.status(200).json({
            successMessage: "Sub Category Added Successfully",
          });
        } else {
          return resp.status(500).json({
            errorMessage: "Failed To Update Sub Sub Children",
          });
        }
        //updating sub sub cat ends......
      } else {
        return resp.status(500).json({
          errorMessage: "Could Not Save Updated Information",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Could Not Find SubCategory",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //......................Handle Edit SubCat

exports.handleEditSubSubCat = async (req, resp, next) => {
  const { subSubCat, id } = req.body;

  try {
    const res = await subSubCatModel.findById(id);

    if (res) {
      res.subSubCat = subSubCat;
      const saveRes = await res.save();
      if (saveRes) {
        return resp.status(200).json({
          successMessage: "SubSub Added Successfully",
        });
      } else {
        return resp.status(500).json({
          errorMessage: "Could Not Save Updated Information",
        });
      }
    } else {
      return resp.status(500).json({
        errorMessage: "Could Not Find Category",
      });
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
}; //......................Handle Edit Cat

exports.handleDeleteCat = async (req, resp, next) => {
  let { id, cat } = req.body;

  cat = cat.toUpperCase();
  //try catch starts.....
  try {
    const find = await ProductModel.findOne({ cat: cat });
    if (find) {
      return resp.status(500).json({
        errorMessage:
          "You cannot delete category under which some product lies",
      });
    } else {
      const delCat = await catModel.findByIdAndDelete(id);
      if (delCat) {
        const delSubCat = await subCatModel.deleteMany({ cat: cat });
        if (delSubCat) {
          const delSubSubCat = await subSubCatModel.deleteMany({ cat: cat });
          if (delSubSubCat) {
            return resp.status(200).json({
              successMessage: "Category Has Been Deleted Successfully",
            });
          } else {
            return resp.status(500).json({
              errorMessage: "Failed To Delete Sub Sub categories",
            });
          }
        } else {
          return resp.status(500).json({
            errorMessage: "Failed To Remove Sub Categories",
          });
        }
      } else {
        return resp.status(500).json({
          errorMessage: "Failed To Delete Category",
        });
      }
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.......
}; //............................handle delete cat

exports.handleDeleteSubCat = async (req, resp, next) => {
  let { id, cat, subCat } = req.body;
  cat = cat.toUpperCase();
  subCat = subCat.toUpperCase();
  //try catch starts.....
  try {
    const find = await ProductModel.findOne({ cat: cat, subCat: subCat });
    if (find) {
      return resp.status(500).json({
        errorMessage:
          "You cannot delete category under which some product lies",
      });
    } else {
      const delSubCat = await subCatModel.findByIdAndDelete(id);
      if (delSubCat) {
        const delSubSubCat = await subSubCatModel.deleteMany({
          cat: cat,
          subCat: subCat,
        });
        if (delSubSubCat) {
          return resp.status(200).json({
            successMessage: "Sub Category Removed Successfull",
          });
        } else {
          return resp.status(500).json({
            errorMessage: "Failed To Remove Sub sub Categories",
          });
        }
      } else {
        return resp.status(500).json({
          errorMessage: "Failed To Delete SubCategory",
        });
      }
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.......
}; //..........................handle delete sub Cat

exports.handleDeleteSubSubcat = async (req, resp, next) => {
  let { cat, subCat, subSubCat, id } = req.body;

  cat = cat.toUpperCase();
  subCat = subCat.toUpperCase();
  subSubCat = subSubCat.toUpperCase();
  console.log("Handle delete sub sub cat called");
  console.log(cat);
  console.log(subCat);
  console.log(subSubCat);

  //try catch starts...
  try {
    const res = await ProductModel.findOne({ cat, subCat, subSubCat });

    if (res) {
      return resp.status(500).json({
        errorMessage:
          "Cannot Delete SubSubCategory under which some product lie",
      });
    } else {
      const delRes = await subSubCatModel.findByIdAndDelete(id);
      if (delRes) {
        return resp.status(200).json({
          successMessage: "Sub Sub Category deleted successfully",
        });
      } else {
        return resp.status(500).json({
          errorMessage: "Could Not Delete SubSubCategory",
        });
      }
    }
  } catch (err) {
    return resp.status(500).json({
      errorMessage: err.message,
    });
  }
  //try catch ends.....
}; //..........................delete sub sub cat ends

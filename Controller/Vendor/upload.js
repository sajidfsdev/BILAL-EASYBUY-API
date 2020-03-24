var uniqid = require("uniqid");
const path = require("path");

exports.handleUploadProductOne = (req, resp, next) => {
  const { id } = req;
  if (req.files === null) {
    return resp.status(500).json({
      errorMessage: "No File Received"
    });
  } else {
    const file = req.files.fileOne;
    if (file === null || file === undefined) {
      return resp.status(500).json({
        errorMessage: "No File Received"
      });
    } else {
      //file checking starts.....

      const mimeType = req.files.fileOne.mimetype;
      if (
        mimeType === "image/jpeg" ||
        mimeType === "image/jpg" ||
        mimeType === "image/png" ||
        mimeType === "image/PNG" ||
        mimeType === "image/gif"
      ) {
      } else {
        return resp.status(500).json({
          errorMessage: "Only Image File Is Allowed"
        });
      }
      //image/jpeg
      //file checking ends.......

      const serverFileName = uniqid() + file.name;
      // ${__dirname}/../../uploads/vendor/products/${serverFileName}
      file.mv(
        path.join(
          path.dirname(process.mainModule.filename),
          "app",
          "uploads",
          "vendor",
          "products",
          serverFileName
        ),
        err => {
          if (err) {
            return resp.status(500).json({
              errorMessage: err.message
            });
          } else {
            return resp.status(200).json({
              serverfilename: serverFileName
            });
          }
        }
      );
    }
  }
}; //...........................................Handle Upload ProductOne

exports.handleUploadProductTwo = (req, resp, next) => {
  const { id } = req;

  if (req.files === null) {
    return resp.status(500).json({
      errorMessage: "No File Received"
    });
  } else {
    const file = req.files.fileTwo;
    if (file === null || file === undefined) {
      return resp.status(500).json({
        errorMessage: "No File Received"
      });
    } else {
      //file checking starts.....

      const mimeType = req.files.fileTwo.mimetype;
      if (
        mimeType === "image/jpeg" ||
        mimeType === "image/jpg" ||
        mimeType === "image/png" ||
        mimeType === "image/PNG" ||
        mimeType === "image/gif"
      ) {
      } else {
        return resp.status(500).json({
          errorMessage: "Only Image File Is Allowed"
        });
      }
      //image/jpeg
      //file checking ends.......

      const serverFileName = uniqid() + file.name;
      file.mv(
        path.join(
          path.dirname(process.mainModule.filename),
          "uploads",
          "vendor",
          "products",
          serverFileName
        ),
        err => {
          if (err) {
            return resp.status(500).json({
              errorMessage: err.message
            });
          } else {
            return resp.status(200).json({
              serverfilename: serverFileName
            });
          }
        }
      );
    }
  }
}; //...........................................Handle Upload ProductTwo

exports.handleUploadProductThree = (req, resp, next) => {
  const { id } = req;

  if (req.files === null) {
    return resp.status(500).json({
      errorMessage: "No File Received"
    });
  } else {
    const file = req.files.fileThree;
    if (file === null || file === undefined) {
      return resp.status(500).json({
        errorMessage: "No File Received"
      });
    } else {
      //file checking starts.....

      const mimeType = req.files.fileThree.mimetype;
      if (
        mimeType === "image/jpeg" ||
        mimeType === "image/jpg" ||
        mimeType === "image/png" ||
        mimeType === "image/PNG" ||
        mimeType === "image/gif"
      ) {
      } else {
        return resp.status(500).json({
          errorMessage: "Only Image File Is Allowed"
        });
      }
      //image/jpeg
      //file checking ends.......

      const serverFileName = uniqid() + file.name;
      file.mv(
        path.join(
          path.dirname(process.mainModule.filename),
          "uploads",
          "vendor",
          "products",
          serverFileName
        ),
        err => {
          if (err) {
            return resp.status(500).json({
              errorMessage: err.message
            });
          } else {
            return resp.status(200).json({
              serverfilename: serverFileName
            });
          }
        }
      );
    }
  }
}; //...........................................Handle Upload ProductThree

exports.handleUploadProductFour = (req, resp, next) => {
  const { id } = req;

  if (req.files === null) {
    return resp.status(500).json({
      errorMessage: "No File Received"
    });
  } else {
    const file = req.files.fileFour;
    if (file === null || file === undefined) {
      return resp.status(500).json({
        errorMessage: "No File Received"
      });
    } else {
      //file checking starts.....

      const mimeType = req.files.fileFour.mimetype;
      if (
        mimeType === "image/jpeg" ||
        mimeType === "image/jpg" ||
        mimeType === "image/png" ||
        mimeType === "image/PNG" ||
        mimeType === "image/gif"
      ) {
      } else {
        return resp.status(500).json({
          errorMessage: "Only Image File Is Allowed"
        });
      }
      //image/jpeg
      //file checking ends.......

      const serverFileName = uniqid() + file.name;
      file.mv(
        path.join(
          path.dirname(process.mainModule.filename),
          "uploads",
          "vendor",
          "products",
          serverFileName
        ),
        err => {
          if (err) {
            return resp.status(500).json({
              errorMessage: err.message
            });
          } else {
            return resp.status(200).json({
              serverfilename: serverFileName
            });
          }
        }
      );
    }
  }
}; //...........................................Handle Upload ProductFour

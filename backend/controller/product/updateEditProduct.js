const uploadProductPermissionController = require("../../helper/uploadProductPermission");
const productModel = require("../../models/productModel");

async function updataEditProductController(req, res) {
  try {
    if (!uploadProductPermissionController(req.userId)) {
      throw new Error("permission denied");
    }

    const { _id, ...resBody } = req.body;

    const editProduct = await productModel.findByIdAndUpdate(_id, resBody);

    res.status(200).json({
      message: "Updating edited product successful",
      data: editProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: "Updating edited product unsuccessful",
      error: true,
      success: false,
    });
  }
}

module.exports = updataEditProductController;

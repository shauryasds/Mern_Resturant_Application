const mongoose = require('mongoose');
const UserModel = require("./models/UserModel");

async function updateUser(req, res) {
  try {
    const data = req.body;
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(data._id)) {
      return res.status(400).json({
        success: false,
        error: true,
        body: {},
        message: "Invalid ID format",
      });
    }

    // Update the product using its ID
    const updatedProduct = await UserModel.findByIdAndUpdate(
      data._id,
      data,
      { new: true, runValidators: true } // runValidators ensures validation rules are applied
    );
      console.log(updatedProduct)
    if (updatedProduct) {
      res.json({
        success: true,
        error: false,
        body: updatedProduct,
        message: "Product updated successfully",
      });
    } else {
      res.json({
        error: true,
        success: false,
        body: {},
        message: "Product not found or not updated",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: true,
      body: {},
      message: e.message,
    });
  }
}

module.exports = updateUser;

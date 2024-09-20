const mongoose = require('mongoose');
const UserModel = require("./models/UserModel");

async function updateUserDetails(req, res) {
  try {
      const data = req.body.data;
      const user = req.user;
      console.log('============user ',user,'data',data)
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(user._id) && req.loginStatus && user._id===data._id) {
      return res.status(400).json({
        success: false,
        error: true,
        body: {},
        message: "Invalid ID format or not logged in",
      });
    }
    console.log('reached below valid id')
    // Update the product using its ID
    const updatedProduct = await UserModel.findByIdAndUpdate(
      data._id,
      data,
      { new: true, runValidators: true } // runValidators ensures validation rules are applied
    );
      console.log(updatedProduct,'uptade')
    if (updatedProduct) {
      res.json({
        success: true,
        error: false,
        body: updatedProduct,
        message: "user updated successfully",
      });
    } else {
      res.json({
        error: true,
        success: false,
        body: {},
        message: "user not found or not updated",
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

module.exports = updateUserDetails;

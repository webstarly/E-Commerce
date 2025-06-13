const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
    console.log("Received request body:", req.body);
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please input your email");
    }
    console.log("email", email);

    if (!password) {
      throw new Error("Please input your password");
    }
    console.log("password", password);

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not Found");
    }
    console.log("user", user);

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(
        tokenData,
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: 60 * 60 * 8 }
      );

      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      res.cookie("token", token, tokenOption).json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please check password");
    }
  } catch (err) {
    res.json({
      message: err.message || "Something happened",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;

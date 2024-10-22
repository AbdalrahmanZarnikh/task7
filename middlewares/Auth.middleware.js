const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

const AuthMiddle = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ status: "Fail", message: "No token, authorization denied" });
  }

  try {

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await userModel.findById(decodedToken.id);

    next();
  } catch (error) {
    res.status(401).json({ status: "Error", message: error.message });
  }
};

module.exports = AuthMiddle;

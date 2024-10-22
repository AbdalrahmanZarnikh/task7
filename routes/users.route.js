const connectdb = require("../DB/connectDb");

const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/users.controller");

const AuthMiddle = require("../middlewares/Auth.middleware");


router.route("/register").post(usersControllers.register);

router.route("/login").post(usersControllers.login);

router.route("/all").get(AuthMiddle,usersControllers.GetUsers)

module.exports = router;

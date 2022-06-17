const express = require("express");
const { userRegister, userLogin } = require("../controller/userControllers");
const router = express.Router();

router.route("/").post(userRegister);
router.route("/loginUser").post(userLogin); //use this for login user API testing via Postman.

module.exports = router;

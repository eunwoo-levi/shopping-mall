const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

//  회원가입  -  /api/user          ,  router에 쓰이는 콜백함수 (userController) 에는 req,res 값을 받는다
router.post("/", userController.createUser);

module.exports = router;

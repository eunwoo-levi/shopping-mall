const express = require("express");
const router = express.Router();
const userApi = require("./userApi");

//      api/user
router.use("/user", userApi);

module.exports = router;

const userController = {};
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// router 쓰이는 콜백함수 (userController) 에는 req,res 값을 받는다
userController.createUser = async (req, res) => {
  try {
    let { email, password, name, level } = req.body;
    // {email:email} 은 {email} 로 간단히 가능
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password,
      name,
      level: level ? level : "customer",
    });

    await newUser.save();
    return res.status(200).json({ statos: "success" });
  } catch (error) {
    res.status(400).json({ statrus: "fail", error: error.message });
  }
};

module.exports = userController;

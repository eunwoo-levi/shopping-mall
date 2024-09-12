const User = require("../models/user");
const bcrypt = require("bcryptjs");

const authController = {};

authController.loginWithEmail = async (req, res) => {
  // 인수 순서 수정
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      // bcrypt.compare를 비동기로 처리
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // token 생성
        const token = await user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }

    throw new Error("Invalid email or password");
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = authController;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      unique,
    },

    name: {
      type: String,
      required: true,
    },

    // admin , customer
    level: {
      type: String,
      default: "customer",
    },
  },
  { timeStamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__V;
  delete obj.updateAt;
  delete obj.createAt;

  return obj;
};

const User = mongoose.model("User", userschema);
module.exports = User;

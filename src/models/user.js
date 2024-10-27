const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");  

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 4,
      maxLength: 50,
      required: true, //this feild is required
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true, //this feild is required
      lowerxase: true,
      trim: true,
      unique: true, //this will not allow me to insert the same emailid once again.
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true, //this feild is required
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      //this below function gets invoked only for the very first time but we still can be enable it while updating the document also by adding runvalidators in opitional parameter in findByIdAndUpdate() during Patch/Put.
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender not valid");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default value for this field.",
    },
    skills: {
      type: [String], //skills are stored as array of strings
    },
  },
  { timestamps: true }
); //always good to keep timestamps

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "SecretMessage", {
    expiresIn: "1h",
  });

  return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid
};

module.exports = mongoose.model("User", userSchema);

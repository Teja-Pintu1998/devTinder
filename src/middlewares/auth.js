const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //this is actually a middleware where we didn't send any response but this specific middleware is used to read the token from the req.cookies, validate the token and find if the user is present or not in the dbfor all APIs for all http methods except for login and signup APIs]

  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid: Please try logging-in again");
    }
    const decodedObj = await jwt.verify(token, "SecretMessage");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not find");
    }
    //the below next will be called only if the token is valid and the user is found.
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error- " + err.message);
  }
};

module.exports = {
  userAuth,
};

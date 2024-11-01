const express = require("express");
const { connectDB } = require("./config/database");
const app = express(); //This creates an instance of web server.
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");


app.use(express.json()); //this middleware runs for every request, thismiddleware converts json format to  js object and put this js object format into the request
app.use(cookieParser());
//app.use(userAuth);
//signin-up new user
app.post("/signup", async (req, res) => {
  try {
    //validation of data happens inthe first step.we can use validator package from npm for the validation
    validateSignUpData(req);

    //encrypt the password from the req.body before saving it into the database.we can use bcrypt package from npm to encrypt our passwords.
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //req.body.password = passwordHash;
    //const user = new User(req.body); //This line creates a new user object based on the User model (schema). The userObj contains the actual data (like first name, last name, email, and password).Think of it as preparing a new user profile to be saved in the database. You’re saying, “Here’s the user data I want to save.” This is similar to creating a row in sql just the same way we create the document here and pass the data of userObj.

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    //console.log(req.body)
    await user.save(); //this line will save the data intothe database. Once the user is created in the above line , this command tells mongodb to save the user profile in the database
    res.status(200).send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    //const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //We cretae jwt here, after validating email and password.

      //written the below code using userSchema.methods

      // const token = await jwt.sign({ _id: user._id }, "SecretMessage", {
      //   expiresIn: "1h",
      // });

      const token = await user.getJWT();
      console.log("token - " + token);
      //Then, add the token to cookie and send back to the user along with the response.
      res.cookie("token", token, { expires: new Date(Date.now() + 8 * 90000) });

      res.send("User login successfull!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(200).send("Error " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

//trying to get only one user data using the emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  // try {
  //   const users = await User.find({ emailId: userEmail });

  //   if (users.length === 0) {
  //     res.send("User not found");
  //   } else {
  //     res.send(users);
  //   }
  // } catch (err) {
  //   console.error("Error fetching user:", err);
  //   res.status(400).send("Something went wrong");
  // }

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//feed API - Get /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Delete API ---> deleting a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    //below we will find whether the user is found or not even before deleting him using his userId passed from the request body
    const findUser = await User.findOne({ _id: userId });
    if (findUser) {
      //const user = await User.findByIdAndDelete({ _id: userId }); or we can also use the below one. Both these are same.
      await User.findOneAndUpdate(userId);
      res.send("User with id - " + userId + " deleted successfully");
    } else {
      res
        .status(400)
        .send("UserId doesn't exists or already might have deleted");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Update API using Ptach
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_updates = ["about", "gender", "age", "skills", "lastName"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_updates.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed for this field");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("Update failed " + err.message);
  }
  // try {
  //   const findingUser = await User.findOne({ emailId: req.body.emailId });//validating whether the user is present or not with his emailId even before updating
  //   if (findingUser) {
  //     const user = await User.findByIdAndUpdate(userId, data, {returnDocument:"before"});
  //     console.log(user + " this is the data before updating")
  //     res.send("user details updated");
  //   } else {
  //     res.status(400).send("User doesn't exist with the emailId you provided");
  //   }
  // } catch (err) {
  //   res.status(400).send("Something went wrong");
  // }
});

//connecting to DB and then to server
connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(3000, () => {
      console.log("Server is successfully listening on the port 3000");
    }); //Now, our server listens on the port 3000
  })

  .catch((err) => {
    console.log("failed to connect to cluster or db");
  });

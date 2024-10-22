const express = require("express");
const { connectDB } = require("./config/database");
const app = express(); //This creates an instance of web server.

const User = require("./models/user");

app.use(express.json()); //this middleware runs for every request, thismiddleware converts json format to  js object and put this js object format into the request

app.post("/signup", async (req, res) => {
  const user = new User(req.body); //This line creates a new user object based on the User model (schema). The userObj contains the actual data (like first name, last name, email, and password).Think of it as preparing a new user profile to be saved in the database. You’re saying, “Here’s the user data I want to save.” This is similar to creating a row in sql just the same way we create the document here and pass the data of userObj.
  //console.log(req.body)
  try {
    await user.save(); //this line will save the data intothe database. Once the user is created in the above line , this command tells mongodb to save the user profile in the database
    res.status(200).send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

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

const express = require("express");
const app = express(); //This creates an instance of web server.
const {adminAuth, userAuth} = require("./middlewares/auth");


app.use("/admin", adminAuth);


app.get("/user", userAuth, (req, res, next) => {
  res.send("User data sent");
});

app.get("/admin/getAllData", (req, res, next) => {
  res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("Deleted User");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on the port 3000");
}); //Now, our server listens on the port 3000

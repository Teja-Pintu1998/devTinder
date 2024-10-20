const express = require("express");
const app = express(); //This creates an instance of web server.

app.use("/user", (req, res, next) => {
  res.send("Hello from the use method");
});


app.get("/user", (req, res, next) => {
  res.send("got user details successfully");
});

app.post("/user", (req, res, next) => {
  //saving data to db
  res.send("user details posted successfully");
});

app.delete("/user", (req, res, next) => {
  res.send("User details deleted successfully");
});

app.use("/test", (req, res, next) => {
  res.send("Hello from the user1");
});

// app.use("/", (req, res, next) => {
//   res.send("Hello from the /");
// });

app.listen(3000, () => {
  console.log("Server is succfully listening on the port 3000");
}); //Now, our server listens on the port 3000

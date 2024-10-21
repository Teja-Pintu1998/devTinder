const express = require("express");
const app = express(); //This creates an instance of web server.

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong ");
  }
});

app.get("/getUserData", (req, res, next) => {
  try {
    //logic of making db call and getting user data
    throw new Error("error man");
    //next();
    res.send("User data sent");
  } catch (err){
    next(err)
    //res.status(500).send(err.message);
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong ");
  }
});

app.listen(3000, () => {
  console.log("Server is successfully listening on the port 3000");
}); //Now, our server listens on the port 3000

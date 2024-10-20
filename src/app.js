const express = require("express");
const app = express(); //This creates an instance of web server.


app.get("/user/:age", (req, res, next) => {
 const art = req.params.age
  res.send("got user details successfully - " + art);
});

app.listen(3000, () => {
  console.log("Server is successfully listening on the port 3000");
}); //Now, our server listens on the port 3000

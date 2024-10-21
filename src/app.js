const express = require("express");
const app = express(); //This creates an instance of web server.


app.use("/login",(req,res,next)=>{
  console.log("logged in successfully");
  
  next();
  res.send("sent user data RHF 1");  
},(req,res,next)=>{
  console.log("logged twice in successfully");
  res.send("sent user data RHF 2");
  next();
})

app.get("/login/user",(req,res,next)=>{
  res.send("sent user data");
})

app.listen(3000, () => {
  console.log("Server is successfully listening on the port 3000");
}); //Now, our server listens on the port 3000

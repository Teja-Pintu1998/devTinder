const express = require("express");
const app = express(); //This creates an instance of web server.

app.use("/test",(req,res,next)=>{
    res.send('Hello from server')

})

app.listen(3000, () => {
  console.log("Server is succfully listening on the port 3000");
}); //Now, our server listens on the port 3000

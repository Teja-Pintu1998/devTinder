const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    console.log("validated");
    next();
  } else {
    res.status(401).send("unauthorized access");
  }

  //this is actually a middleware where we didn't send any response but this specific middleware is used to check the authorization for all /admin APIs for all http methods and this particular middleware is only called for /admin or /admin/xxx or /admin/xxx/yyy/......etc routes]
};


const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    console.log("validated");
    next();
  } else {
    res.status(401).send("unauthorized access");
  }

  //this is actually a middleware where we didn't send any response but this specific middleware is used to check the authorization for all /admin APIs for all http methods and this particular middleware is only called for /admin or /admin/xxx or /admin/xxx/yyy/......etc routes]
};


module.exports = {
  adminAuth,
  userAuth
};

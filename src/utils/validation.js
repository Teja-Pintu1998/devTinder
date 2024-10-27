const validator = require("validator");

const validateSignUpData = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name or skills are missing");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is week")
    }

};

module.exports = {
    validateSignUpData
}
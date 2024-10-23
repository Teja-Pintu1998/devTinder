const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength:4,
        maxLength:50,
        required: true, //this feild is required
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true, //this feild is required
        lowerxase:true,
        trim:true, 
        unique: true, //this will not allow me to insert the same emailid once again 
    },
    password: {
        type: String,
        required: true, //this feild is required
    },
    age: {
        type: Number,
        min:18,
    },
    gender: {
        type: String,
        //this below function gets invoked only for the very first time but we still can be enable it while updating the document also by adding runvalidators in opitional parameter in findByIdAndUpdate() during Patch/Put.
        validate(value){
            if(!["male","female","others"].includes()){
                throw new Error("Gender not valid");
            }
        }
    },
    about: {
        type: String,
        default: "This is a default value for this field."
    },
    skills:{
        type: [String] //skills are stored as array of strings
    }
    
},{timestamps:true}); //always good to keep timestamps


module.exports = mongoose.model("User", userSchema);


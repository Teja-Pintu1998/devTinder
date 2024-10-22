const mongoose = require("mongoose"); //this mongoose is a driver helps in connecting application with the database

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://tejapintu4:0ZRw7tpNjrwcP0fS@namastenode.nr7lh.mongodb.net/devTinder"
  );
};

module.exports = {
  connectDB,
};

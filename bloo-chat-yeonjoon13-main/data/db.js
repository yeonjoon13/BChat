const mongoose = require("mongoose");
require("dotenv").config();


// TODO replace <password> with the password for quicknote-admin
const URI = "mongodb+srv://jooni22:Kenny123@cluster0.fdeux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };

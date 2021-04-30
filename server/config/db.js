const mongoose = require("mongoose");
require("dotenv").config({ path: "vars.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("..DB connected");
  } catch (error) {
    console.log(error);
    //stops the app if an error occurs
    process.exit(1);
  }
};
module.exports = connectDB;

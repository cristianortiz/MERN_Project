const express = require("express");
const connectDB = require("./config/db");

//create the server
const app = express();
//connects to DB
connectDB();
//enable express.json
app.use(express.json({ extended: true }));

//app port
const PORT = process.env.PORT || 4000;

//import routes
app.use("/api/users", require("./routes/users"));

//test main page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//start serve
app.listen(PORT, () => {
  console.log(`..running on port: ${PORT}`);
});

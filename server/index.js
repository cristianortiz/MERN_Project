const express = require("express");

//create the server
const app = express();
//app port
const PORT = process.env.PORT || 4000;

//test main page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//start server
app.listen(PORT, () => {
  console.log(`..running on port: ${PORT}`);
});

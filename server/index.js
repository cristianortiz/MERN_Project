const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

//create the server
const app = express();
//connects to DB
connectDB();
//enable cors
app.use(cors());
//enable express.json
app.use(express.json({ extended: true }));
//app port
const PORT = process.env.PORT || 4000;
//import routes
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/auth", require("./routes/authRoutes")); //login users
//import project routes
app.use("/api/projects", require("./routes/projectRoutes"));
//import tasks  routes
app.use("/api/tasks", require("./routes/tasksRoutes"));

//test main page
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//start serve
app.listen(PORT, () => {
  console.log(`..running on port: ${PORT}`);
});

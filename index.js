const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();

// DATABASE CONNECTION
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
  console.log("DB connection failed with - ", err);
});
// IMPORT ROUTERS
const todoRoutes = require("./routes/todo.routes");
// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ROUTER MIDDLEWARE
app.use("/todos", todoRoutes);

// SERVER LISTENING
const port = 8000;
app.listen(port, () => {
  console.log("this server yemchi 3al port" + port);
});
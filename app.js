if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;

//MONGOOSE CONNECTION TO MONGODB
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err, "Database failed to connect."));
mongoose.connection.on("error", (err) => {
  console.log(err);
});

// IMPORTING ROUTES
const indexRouter = require("./routes/index");

//MIDDLEWARE
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ROUTE HANDLING
app.get("/", indexRouter);

// LISTENING PORT
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}.`);
});

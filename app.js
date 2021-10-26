const express = require("express");
const morgan = require("morgan");
const app = express();
const { URL } = require("./url");
const authRoutes = require("./routes/authRoute");
const mongoose = require("mongoose");

//Plyaground Routes
const validatorRoutes = require("./playground/validator");

app.set("view engine", "ejs");
app.set("views", "views");

const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
];

app.use(middleware);

app.use("/auth", authRoutes);

//Playground
app.use("/playground", validatorRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

const PORT = process.env.PORT || 8080;
mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server is Running on Port = http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

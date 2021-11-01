const express = require("express");
const morgan = require("morgan");
const { URL } = require("./url");
const authRoutes = require("./routes/authRoute");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { bindUserWithRequest } = require("./middleware/authMiddleware");
const setLocals = require("./middleware/setLocals");
const dashboardRoute = require("./routes/dashboardRoute");
const flash = require("connect-flash");
// const config = require("./config/config");
const config = require("config");

// const validatorRoute = require("./playground/validator");

const store = new MongoDBStore({
  uri: URL,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2,
});

const app = express();

console.log(config.get("name"));

console.log(app.get("env"));

// if (app.get("env").toLowerCase() === "development") {
//   console.log(config.dev.name);
// } else {
//   console.log(config.prod.name);
// }

if (app.get("env").toLowerCase() === "development") {
  app.use(morgan("dev"));
}

app.set("view engine", "ejs");
app.set("views", "views");

const middleware = [
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRET_KEY || "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  bindUserWithRequest(),
  setLocals(),
  flash(),
];

app.use(middleware);

app.use("/auth", authRoutes);

app.use("/dashboard", dashboardRoute);

// app.use("/playground", validatorRoute);

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

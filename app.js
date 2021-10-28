const express = require("express");
const morgan = require("morgan");
const { URL } = require("./url");
const authRoutes = require("./routes/authRoute");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: URL,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2,
});

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRET_KEY || "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
];

app.use(middleware);

app.use("/auth", authRoutes);

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

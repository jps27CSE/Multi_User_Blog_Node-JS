const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);
const { bindUserWithRequest } = require("./authMiddleware");
const setLocals = require("./setLocals");
const { URL } = require("../url");

const store = new MongoDBStore({
  uri: URL,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2,
});

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
  flash(),
  bindUserWithRequest(),
  setLocals(),
];

module.exports = (app) => {
  middleware.forEach((m) => {
    app.use(m);
  });
};

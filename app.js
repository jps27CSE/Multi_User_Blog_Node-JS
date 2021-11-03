const express = require("express");
const { URL } = require("./url");
const mongoose = require("mongoose");
const chalk = require("chalk");
const setMiddleware = require("./middleware/middleware");
const setRoutes = require("./routes/routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//Using Middleware from Middleware Directory
setMiddleware(app);

//Using Routes from Route Directory
setRoutes(app);

app.use((req, res, next) => {
  let error = new Error("404 Page Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error.status === 404) {
    return res.render("pages/error/404", { flashMessage: {} });
  }
});

const PORT = process.env.PORT || 8080;
mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(() => {
    console.log(chalk.green("Database Connected"));
    app.listen(PORT, () => {
      console.log(
        chalk.cyan(`Server is Running on Port = http://localhost:${PORT}`)
      );
    });
  })
  .catch((e) => {
    console.log(e);
  });

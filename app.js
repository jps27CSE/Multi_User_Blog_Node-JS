const express = require("express");
const morgan = require("morgan");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
];

app.use(middleware);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is Running on Port = http://localhost:${PORT}`);
});

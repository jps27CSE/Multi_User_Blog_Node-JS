const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is Running on Port = http://localhost:${PORT}`);
});

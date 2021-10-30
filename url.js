require("dotenv").config();

let DB_PASSWORD = process.env.DB_PASSWORD;
let DB_ADMIN = process.env.DB_ADMIN;

exports.URL = `mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@exp-blog.oxaii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

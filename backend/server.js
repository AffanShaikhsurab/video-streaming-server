const express = require("express");
const router = require("./Router/router");
const cors = require("cors"); // Import the cors middleware
const app = express();
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(router);
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

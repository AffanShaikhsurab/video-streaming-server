require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.bfug4ex.mongodb.net/${process.env.DB_name}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB")) // If connected to DB
  .catch((err) => console.error("Error connecting to MongoDB:", err)); // If not connected to DB

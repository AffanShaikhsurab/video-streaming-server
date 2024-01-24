require("dotenv").config()
const mongoose = require("mongoose");

mongoose
  .connect(
    `MONGODB_URI=mongodb+srv://vinuutaurus:Vinay@001@cluste0.ukjw4ij.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected")) //If connected to DB
  .catch((err) => console.log(err)); //If not connected to DB

// mongoose
//   .connect(
//     `mongodb://127.0.0.1:27017/${process.env.DB_name}?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("Connected")) //If connected to DB
//   .catch((err) => console.log(err)); //If not connected to DB
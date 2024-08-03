const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect('mongodb+srv://navafnaz555:dzq0YuaKfM6mbzPZ@cluster0.3a673xl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Database connected");
    console.log("http://localhost:27017");
  })
  .catch((err) => {
    console.log("Database error: " + err);
    process.exit(1)
  });
}
module.exports = connectDB; 



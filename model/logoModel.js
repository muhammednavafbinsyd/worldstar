const mongoose = require("mongoose");

const logoschema = new mongoose.Schema({
  Logoimage: [
    {
      type: String,
      required: true,
    },
  ],
});

const logomodel = mongoose.model("Logo", logoschema);
module.exports = logomodel;

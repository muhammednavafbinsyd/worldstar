const mongoose = require('mongoose');

const PagesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
});

const Pages = mongoose.model('Pages', PagesSchema);
module.exports = Pages;


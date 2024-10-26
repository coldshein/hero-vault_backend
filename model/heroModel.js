const mongoose = require("mongoose");

const heroSchema = mongoose.Schema({
  nickname: { type: String, required: true },
  real_name: { type: String },
  origin_description: { type: String },
  superpowers: [{ type: String }],
  catch_phrase: { type: String },
  images: [{ type: String }],
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;

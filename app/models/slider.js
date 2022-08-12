const { default: mongoose } = require("mongoose");

const sliderSchema = new mongoose.Schema({
  title: { type: String },
  text: { type: String },
  image: { type: String, required: true },
  type: { type: String, default: "main" },
});
module.exports = { SliderModel: mongoose.model("Slider", sliderSchema) };

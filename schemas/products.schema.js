// 스키마 모델 작성
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
  },
  pwd: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productsSchema);

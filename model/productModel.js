
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
    autopopulate: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Product', ProductSchema);

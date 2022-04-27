const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true,},
    title: { type: String, required: true, },
    desc: { type: String, required: true, },
    band: { type: String, required: true },
    artist: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    titleTrade: { type: String, required: true,},
    descTrade: { type: String, required: true, },
    bandTrade: { type: String, required: true },
    artistTrade: { type: String, required: true },
    contact: { type: String, required: true,},
    inStock:{type:Boolean, default: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", CardSchema);
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String },
  level: { type: String },
  score: { type: String },
});

const PlayerModel = mongoose.model("auth", playerSchema);

module.exports = PlayerModel;

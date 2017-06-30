var mongoose = require("mongoose");

var characterSchema = new mongoose.Schema({
    name: String,
    level: Number,
    gameClass: String,
    skill: String,
    image: String,
    likes: String,
    dislikes: String
});

module.exports = mongoose.model("Character", characterSchema);
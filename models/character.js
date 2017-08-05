var mongoose = require("mongoose");

var characterSchema = new mongoose.Schema({
    name: String,
    race: String,
    gameClass: String,
    skill: String,
    image: String,
    likes: String,
    dislikes: String
});

module.exports = mongoose.model("Character", characterSchema);
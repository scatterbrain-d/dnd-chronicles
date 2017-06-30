var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    caption: String,
    dm: String,
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Character"
    }],
    date: String
});

module.exports = mongoose.model("Session", sessionSchema);
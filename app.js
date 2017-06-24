var mongoose = require("mongoose"),
    express =  require("express"),
    app =      express();
    

mongoose.connect("mongodb://localhost/chronicles");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var playerSchema = new mongoose.Schema({
    name: String,
    page: String
});

var Player = mongoose.model("Player", playerSchema);

var sessionSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    party: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    }],
    date: String
});

var Session = mongoose.model("Session", sessionSchema);

app.get("/", function(req, res){
   res.render("index"); 
});




app.listen(process.env.PORT, process.env.IP, function(){
   console.log("chronicles running"); 
});
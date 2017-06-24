var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express =  require("express"),
    app =      express();
    

mongoose.connect("mongodb://localhost/chronicles");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


var sessionSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    party: [String],
    date: String
});

var Session = mongoose.model("Session", sessionSchema);

app.get("/", function(req, res){
   res.render("index"); 
});

app.get("/new", function(req, res){
   res.render("new"); 
});

app.post("/", function(req, res){
   var title = req.body.title,
       image = req.body.image,
       date = req.body.date,
       party = req.body.party,
       content = req.body.content,
       newSession = {title: title, image: image, date: date, party: party, content: content}
       Session.create(newSession, function(err, createdSession){
           if (err){
               console.log(err);
           } else {
               console.log(createdSession);
               res.redirect("/");
           }
       });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("chronicles running"); 
});
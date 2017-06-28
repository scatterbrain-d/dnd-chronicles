var methodOverride = require("method-override"),
    bodyParser =     require("body-parser"),
    mongoose =       require("mongoose"),
    express =        require("express"),
    app =            express();
    
//==========================================

mongoose.connect("mongodb://localhost/chronicles_2");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// TO DO
// Add DM,img caption to session schema
// party name shortcut doesn't work with spaces or some other characters - make schema or convert somehow
//==========================================


var characterSchema = new mongoose.Schema({
    name: String,
    level: Number,
    gameClass: String,
    skill: String,
    image: String,
    likes: String,
    dislikes: String
});

var Character = mongoose.model("Character", characterSchema);


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

var Session = mongoose.model("Session", sessionSchema);

//==========================================


app.get("/", function(req, res){
    Session.find({}, function(err, sessions){
        if (err){
            console.log(err);
        } else {
            res.render("index", {sessions: sessions});    
        }
    })
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
       newSession = {title: title, image: image, date: date, party: party, content: content};
       Session.create(newSession, function(err, createdSession){
           if (err){
               console.log(err);
           } else {
               console.log(createdSession);
               res.redirect("/");
           }
       });
});

app.get("/:id", function(req, res){
    Session.findById(req.params.id, function(err, foundSession){
        if (err){
            console.log(err);
        } else {
            res.render("show", {session: foundSession});
        }
    })
})



app.get("/:id/edit", function(req, res){
   Session.findById(req.params.id, function(err, foundSession){
       if (err){
           console.log(err);
           res.redirect("/");
       } else {
           res.render("edit", {session: foundSession});
       }
   }); 
});

app.put("/:id", function(req, res){
    req.body.session.party = req.body.newParty;
    Session.findByIdAndUpdate(req.params.id, req.body.session, function(err, updatedSession){
        if (err){
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/" + req.params.id);
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("chronicles running"); 
});
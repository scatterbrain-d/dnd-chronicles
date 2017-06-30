var methodOverride = require("method-override"),
    bodyParser =     require("body-parser"),
    mongoose =       require("mongoose"),
    express =        require("express"),
    app =            express();
    
//==========================================

mongoose.connect("mongodb://localhost/chronicles_2");
mongoose.Promise = global.Promise;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

//INDEX
app.get("/", function(req, res){
    Session.find({}, function(err, sessions){
        if (err){
            console.log(err);
        } else {
            res.render("session/index", {sessions: sessions});    
        }
    });
});

//NEW
app.get("/new", function(req, res){
    Character.find({}, function(err, characters){
        if (err) {
            console.log(err);
        } else {
            res.render("session/new", {characters: characters}); 
        }
    });
});

//CREATE
app.post("/", function(req, res){
    Session.create(req.body.session, function(err, createdSession){
        if (err){
            console.log(err);
        } else {
            console.log(createdSession);
            res.redirect("/");
        }
    });
    console.log(req.body);
});

//SHOW
app.get("/:id", function(req, res){
    Session.findById(req.params.id).populate("characters").exec(function(err, foundSession){
        if (err){
            console.log(err);
        } else {
            res.render("session/show", {session: foundSession});
        }
    });
});

//EDIT
app.get("/:id/edit", function(req, res){
    Character.find({}, function(err, characters){
        if (err) {
            console.log(err);
        } else {
            Session.findById(req.params.id, function(err, foundSession){
                if (err){
                   console.log(err);
                   res.redirect("/");
               } else {
                   res.render("session/edit", {session: foundSession, characters: characters});
                }
            });    
        }
    });
});

//UPDATE
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

//DELETE
app.delete("/:id", function(req, res){
    Session.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    }); 
});

//Character Routes
//=============================

//index
app.get("/characters", function(req, res){
    Character.find({}, function(err, character) {
        if (err) {
            console.log(err);
        } else {
            res.render("character/main", {character: character});  
        }
    });
});

//show
app.get("/characters/:id", function(req, res){
    Character.findById(req.params.id, function(err, character){
        if (err) {
            console.log(err);
        } else {
            res.render("character/show", {character: character});
        }
    }); 
});

//edit
app.get("/characters/:id/edit", function(req, res){
    
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("chronicles running"); 
});
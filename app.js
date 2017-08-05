var methodOverride = require("method-override"),
    bodyParser =     require("body-parser"),
    mongoose =       require("mongoose"),
    express =        require("express"),
    app =            express();
    
//==========================================

var characterRoutes = require("./routes/character"),
    sessionRoutes =   require("./routes/session");
    
//==========================================

//changes:
//character schema - level, + race
//collapsable sidebar?


mongoose.connect("mongodb://localhost/chronicles_3");
mongoose.Promise = global.Promise;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use("/characters", characterRoutes);
app.use("/sessions", sessionRoutes);


//==========================================


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("chronicles running"); 
});
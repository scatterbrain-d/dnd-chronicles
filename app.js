var methodOverride = require("method-override"),
    bodyParser =     require("body-parser"),
    mongoose =       require("mongoose"),
    express =        require("express"),
    app =            express();
    
//==========================================

var sessionRoutes =   require("./routes/session"),
    characterRoutes = require("./routes/character");
//==========================================

//changes:
//collapsable sidebar?

var dbase = process.env.DATABASEURL || "mongodb://localhost/chronicles_3";

mongoose.connect(dbase);
mongoose.Promise = global.Promise;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use("", sessionRoutes);
app.use("/characters", characterRoutes);

//==========================================


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("chronicles running"); 
});
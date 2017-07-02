//character routes

var express = require("express"),
    router =  express.Router();

var Character = require("../models/character.js");

//index
router.get("/", function(req, res){
    Character.find({}, function(err, character) {
        if (err) {
            console.log(err);
        } else {
            res.render("character/index", {character: character});  
        }
    });
});

//new
router.get("/new", function(req, res){
    res.render("character/new");
});

//create
router.post("/", function(req, res){
    Character.create(req.body.character, function(err, createdCharacter){
        if (err){
            console.log(err);
        } else {
            res.redirect("/characters");
        }
    });
});

//show
router.get("/:id", function(req, res){
    Character.findById(req.params.id, function(err, character){
        if (err) {
            console.log(err);
        } else {
            res.render("character/show", {character: character});
        }
    });
});

//edit
router.get("/:id/edit", function(req, res){
    Character.findById(req.params.id, function(err, foundCharacter){
        if (err){
           console.log(err);
           res.redirect("/characters");
        } else {
            res.render("character/edit", {character: foundCharacter});
        }
    });    
});

//update
router.put("/:id", function(req, res){
    Character.findByIdAndUpdate(req.params.id, req.body.character, function(err, updatedCharacter){
        if (err){
            console.log(err);
            res.redirect("/characters");
        } else {
            res.redirect("/characters/" + req.params.id);
        }
    });
});

//delete
router.delete("/:id", function(req, res){
    Character.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
        }
        res.redirect("/characters");
    }); 
});

module.exports = router;
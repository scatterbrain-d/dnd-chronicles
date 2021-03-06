//character routes

var express = require("express"),
    router =  express.Router();

var Character = require("../models/character.js");

//INDEX
router.get("/", function(req, res){
    Character.find({}, function(err, character) {
        if (err) {
            console.log(err);
        } else {
            res.render("character/index", {character: character});  
        }
    });
});

//NEW
router.get("/new", function(req, res){
    res.render("character/new");
});

//CREATE
router.post("/", function(req, res){
    Character.create(req.body.character, function(err, createdCharacter){
        if (err){
            console.log(err);
        } else {
            res.redirect("/characters");
        }
    });
});

//SHOW
router.get("/:id", function(req, res){
    Character.findById(req.params.id, function(err, character){
        if (err) {
            console.log(err);
        } else {
            res.render("character/show", {character: character});
        }
    });
});

//EDIT
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

//UPDATE
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

//DELETE
router.delete("/:id", function(req, res){
    Character.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
        }
        res.redirect("/characters");
    }); 
});

module.exports = router;
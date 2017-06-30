var express = require("express"),
    router =  express.Router();

var Character = require("../models/character.js");

//index
router.get("/", function(req, res){
    Character.find({}, function(err, character) {
        if (err) {
            console.log(err);
        } else {
            res.render("character/main", {character: character});  
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
    
});




module.exports = router;
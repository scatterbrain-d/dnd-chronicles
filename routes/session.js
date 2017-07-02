var express = require("express"),
    router =  express.Router();

var Character = require("../models/character.js"),
    Session   = require("../models/session.js");

//index
router.get("/", function(req, res){
    Session.find({}, function(err, sessions){
        if (err){
            console.log(err);
        } else {
            res.render("session/index", {sessions: sessions});    
        }
    });
});

//new
router.get("/new", function(req, res){
    Character.find({}, function(err, characters){
        if (err) {
            console.log(err);
        } else {
            res.render("session/new", {characters: characters}); 
        }
    });
});

//create
router.post("/", function(req, res){
    Session.create(req.body.session, function(err, createdSession){
        if (err){
            console.log(err);
        } else {
            res.redirect("/session");
        }
    });
});

//show
router.get("/:id", function(req, res){
    Session.findById(req.params.id).populate("characters").exec(function(err, foundSession){
        if (err){
            console.log(err);
        } else {
            res.render("session/show", {session: foundSession});
        }
    });
});

//edit
router.get("/:id/edit", function(req, res){
    Character.find({}, function(err, characters){
        if (err) {
            console.log(err);
        } else {
            Session.findById(req.params.id, function(err, foundSession){
                if (err){
                   console.log(err);
                   res.redirect("/sessions");
               } else {
                   res.render("session/edit", {session: foundSession, characters: characters});
                }
            });    
        }
    });
});

//update
router.put("/:id", function(req, res){
    req.body.session.party = req.body.newParty;
    Session.findByIdAndUpdate(req.params.id, req.body.session, function(err, updatedSession){
        if (err){
            console.log(err);
            res.redirect("/sessions");
        } else {
            res.redirect("/sessions/" + req.params.id);
        }
    });
});

//delete
router.delete("/:id", function(req, res){
    Session.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
        }
        res.redirect("/sessions");
    }); 
});

module.exports = router;
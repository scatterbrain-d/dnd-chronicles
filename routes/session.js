var express = require("express"),
    router =  express.Router();

var mongoose = require("mongoose");

var Character = require("../models/character.js"),
    Session   = require("../models/session.js");

//LANDING (redirect)
router.get("/", function(req, res) {
    res.redirect("/sessions");
});


//INDEX
router.get("/sessions", function(req, res){
    Session.find({}).sort({_id:1}).exec(function(err, sessions){
        if (err){
            console.log(err);
        } else {
            res.render("session/index", {sessions: sessions});    
        }
    });
});

//NEW
router.get("/sessions/new", function(req, res){
    Character.find({}, function(err, characters){
        if (err) {
            console.log(err);
        } else {
            res.render("session/new", {characters: characters}); 
        }
    });
});

//CREATE
router.post("/sessions", function(req, res){
    Session.create(req.body.session, function(err, createdSession){
        if (err){
            console.log(err);
        } else {
            res.redirect("/sessions");
        }
    });
});

//SHOW
router.get("/sessions/:id", function(req, res){
    Session.findById(req.params.id).populate("characters").exec(function(err, foundSession){
        if (err){
            console.log(err);
        } else {
            res.render("session/show", {session: foundSession});
        }
    });
});

//EDIT
router.get("/sessions/:id/edit", function(req, res){
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

//UPDATE
router.put("/sessions/:id", function(req, res){
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

//DELETE
router.delete("/sessions/:id", function(req, res){
    Session.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
        }
        res.redirect("/sessions");
    }); 
});

module.exports = router;
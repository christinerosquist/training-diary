const model = require("../model.js");
const express = require('express');
const router = express.Router();

router.get('/getworkouts', async function (req, res) {
    const workouts = await model.getWorkouts()
    const sessions = await model.getSessions()

    res.json({
        workouts: workouts,
        sessions: sessions
    });
});

router.get('/profile/:id', async function (req, res) {
    res.json({
    });
});

router.get('/addworkout', async function (req, res) {
    res.json({
    });
});

router.post('/addprogress', async function (req, res) {
    res.json({
    });
});

router.get('/testconnection', async function (req, res) {
    console.log("Got here");
    var users = await model.getUsers();
    var validUser = await model.validateUser(users);
    if(validUser){ //Gör detta snyggare sen nu bara för test
        res.json({
            express : "Valid"
        })
    }
    else res.json({
        express : "Invalid"
    })
});

router.get('/validateuser/:email/:password', async function (req, res){
    var users = await model.getUsers(); //Gets all the users from the db
    var validUser = await model.validateUser(users, req.params.email, req.params.password); //Function that the user if its valid
    if(validUser != null){
        res.json({
            user : validUser
        })
    }
    else res.json({
        user : "Invalid"
    })
});

router.get('/createuser/:email/:password/:name/:sex/:height/:weight', async function (req, res){
    await model.createUser(req.params.email, req.params.password, req.params.name, req.params.sex, req.params.height, req.params.weight)
    var users = await model.getUsers();
    res.json({
        express : "Test"
    })
});

module.exports = router; // export the router with the functions for the urls.

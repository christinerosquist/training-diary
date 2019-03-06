const model = require("../model.js");
const express = require('express');
const router = express.Router();

router.get('/getworkouts', async function (req, res) {
    const workouts = await model.getWorkouts(1)
    const sessions = await model.getSessions(1)

    res.json({
        workouts: workouts,
        sessions: sessions
    });
});

router.get('/profile/:id', async function (req, res) {
    const userId = req.params.id
    const allWorkouts = await model.getWorkouts(userId)

    const workouts = [];

    allWorkouts.map(async (workout) => {
        if(workout.type === 'Session'){
            console.log("rest: I got a session workout!")

            const sessions = await model.getSessions(workout.id)

            console.log("rest: And the sessions for this workout is: ", sessions)
            workouts.push({
                workout: workout,
                sessions: sessions
            })
        } else {
            workouts.push(workout)
        }
    })

    console.log("rest controller is sending this to frontend: ", workouts)

    res.json({
        workouts: workouts
    });
});

router.post('/addworkout', async function (req, res) {
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

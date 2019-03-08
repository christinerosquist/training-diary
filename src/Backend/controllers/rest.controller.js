const model = require("../model.js");
const express = require('express');
const router = express.Router();

router.get('/profile/:id', async function (req, res) {
    const user_id = req.params.id
    const workouts = await model.getWorkouts(user_id)

    res.json({
        workouts: workouts
    });
});

router.get('/getsessions/:id', async function (req, res) {
    console.log("got here haha")
    const workout_id = req.params.id
    const sessions = await model.getSessions(workout_id);
    const exercises = await model.getExercises(sessions);
    console.log(exercises);
    console.log(sessions);

    res.json({
        sessions: sessions,
        exercises: exercises
    })
});

router.get('/getgrouptraining/:id', async function (req, res) {
    const workout_id = req.params.id
    const group_training = await model.getGroupTraining(workout_id)

    res.json({
        group_training: group_training
    })
});

router.get('/getgrouptrainings', async function (req, res) {
    console.log("ggt")
    const group_trainings = await model.getAllGroupTrainings()

    res.json({
        group_trainings: group_trainings
    })
});

router.get('/getprogress/:id', async function (req, res) {
    const user_id = req.params.id
    const muscledata = await model.getMuscleProgress(user_id)
    const weightdata = await model.getWeightProgress(user_id)

    res.json({
        muscledata: muscledata,
        weightdata: weightdata
    })
});

router.get('/feed', async function (req, res) {
    const entries = await model.getFeedWorkouts()
    const exEntries = await model.createWorkoutObject(entries)

    console.log(exEntries)

    res.json({
        entries: exEntries
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

router.get('/addworkout/:userid/:gtid', async function (req, res) {
    let today = new Date()
    console.log(req.params)
    const workout = await model.makeWorkout(req.params.userid, req.params.gtid, today)
    const workouts = await model.getAllWorkouts()

    console.log(workouts)

    res.json({
        express: "Done"
    })
});

router.get('/validateuser/:email/:password', async function (req, res) {
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
    var user = await model.createUser(req.params.email, req.params.password)
    var userInfo = await model.createUserInfo(user, req.params.name, req.params.sex, req.params.height, req.params.weight)
    res.json({
        express : "Done"
    })
});

module.exports = router; // export the router with the functions for the urls.

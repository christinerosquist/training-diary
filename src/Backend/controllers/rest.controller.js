const model = require("../model.js");
const express = require('express');
const router = express.Router();

router.get('/getCurrentUser', async function (req, res){
    if(req.session.loggedIn){ //Om användare är inloggad
        const userId = req.session.currentUser;
        var user = await model.getUser(userId);
        res.json({
            user: user,
        })
    }
    else{
        res.json({
            user: "Not logged in"
        })
    }
})


router.get('/getUserInfo/:id', async function (req, res){
    if(req.session.loggedIn){ //Om användare är inloggad
        const userId = req.params.id;
        var userInfo = await model.getUserInfoByUserId(userId);
        res.json({
            userInfo: userInfo,
        })
    }
    else{
        res.json({
            userInfo: "Not logged in"
        })
    }
})



router.get('/profile/:id', async function (req, res) {
    if(req.session.loggedIn){
        const user_id = req.params.id;
        const workouts = await model.getWorkouts(user_id)

        res.json({
            workouts: workouts
        });
    }
    else{
        res.json({
            workouts: 'Not logged in'
        });
    }

});

router.get('/getsessions/:id', async function (req, res) {
    const workout_id = req.params.id
    const sessions = await model.getSessions(workout_id);
    const exercises = await model.getExercises(sessions);

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
    const group_trainings = await model.getAllGroupTrainings()
    const exercises = await model.getAllExercises()

    res.json({
        group_trainings: group_trainings,
        exercises: exercises
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
    if(req.session.loggedIn){
        const workouts = await model.getFeedWorkouts();
        const feedInfo = await model.getFeedInfo(workouts);
        res.json({
            feedInfo: feedInfo, //Returns array containing information to be posted in feed
        });
    }
    else{
        res.json({
            feedInfo: "Not logged in"
        })
    }

});

router.post('/addprogress', async function (req, res) {
        const userId = req.session.currentUser;
        const newprogress = await model.addProgress(userId, req.body.mode, req.body.date, req.body.data)

        return res.json({data: newprogress});

});

router.get('/testconnection', async function (req, res) {
    const users = await model.getUsers();
    const validUser = await model.validateUser(users);
    if(validUser){
        res.json({
            express : "Valid"
        })
    }
    else res.json({
        express : "Invalid"
    })
});

router.post('/addworkout', async function (req, res) {
    const workout = await model.makeWorkout(req.body.user, req.body.group_training, req.body.sessions, req.body.date)

    return res.json({data: workout});
});

router.get('/validateuser/:email/:password', async function (req, res) {
    var users = await model.getAllUsers(); //Gets all the users from the db
    var validUser = await model.validateUser(users, req.params.email, req.params.password); //Function that the user if its valid
    if(validUser != null){
        req.session.loggedIn = true;
        req.session.currentUser = validUser.dataValues.id;
        res.json({
            user : validUser
        })
    }
    else res.json({
        user : "Invalid"
    })
});

router.post('/createuser', async function (req, res){
    const user = await model.createUser(req.body.email, req.body.password)
    if(!user){
        res.json({success: false})
    } else {
        res.json({success: true, id: user.id})
    }
});

router.post('/createuserinfo', async function (req, res){
    const weight = parseInt(req.body.weight)
    const muscle = parseInt(req.body.muscle)

    const userinfo = await model.createUserInfo(req.body.id, req.body.name, req.body.sex, req.body.height, req.body.link, req.body.deletehash)
    const newwprogress = await model.addProgress(req.body.id, 'weight', req.body.date, weight)
    const newmprogress = await model.addProgress(req.body.id, 'muscle', req.body.date, muscle)
})

module.exports = router; // export the router with the functions for the urls.

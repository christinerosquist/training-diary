const crypto = require('crypto');
const seq = require("./sequelize.js")
const {User, UserInfo, Session, Workout, Exercise, GroupTraining, MuscleMassProgress, WeightProgress, sequelize} = seq()

exports.createUser = (email, password) => {
    var salt = crypto.randomBytes(16).toString('hex');
    return User.create({
        salt: salt,
        // hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
        hash: crypto.pbkdf2Sync(password, salt,1000, 64, `sha512`).toString(`hex`), //Hashar
        email: email
    }).then(data => {return data})
}

// Log all workouts of a user
exports.getWorkouts = (user) => {
    user.getWorkouts()
        .then(workouts => {
        return workouts
        })
        .catch(error => {console.log(error)})
}

exports.getAllWorkouts = () => {
    return Workout.findAll()
        .then(workouts => {
        // console.log("number of workouts: " + workouts.length)
        // console.log(workouts)
        return workouts
        })
        .catch(error => {console.log(error)})
}

exports.getAllUsers = () => {
    console.log("Got here")
    return User.findAll() // HÄR KAN MAN ÄNDRA FÖR ATT TESTA OLIKA TABELLER
        .then(data => {
            console.log("number of users: " + data.length)
            return data
        })
        .catch(error => {console.log(error)})
}

exports.getUser = (userID) => {
    return User.findByPk(userID)
        .then(user => {
            return user
        })
        .catch(error => {console.log(error)})
}

exports.getAllGroupTrainings = () => {
    return GroupTraining.findAll()
        .then(gts => {
            return gts
        })
        .catch(error => {console.log(error)})
}
 exports.getGroupTraining = (gtID) => {
     return GroupTraining.findByPk(gtID)
        .then(gt => {
            return gt
        })
        .catch(error => {console.log(error)})
 }

exports.getSessions = () => {
    return Workout.findByPk(1)
        .then(workout => {
            workout.getSessions()
                .then(sessions => {
                    console.log("number of sessions: " + sessions.length)
                    console.log(sessions)
                    return sessions
                })
        })
        .catch(error => {console.log(error)})
}

// Working
exports.makeWorkout = async (userID, groupTrainID, date) => {
    let type = "Session"
    if(groupTrainID !== null) {
        type = "Group Training"
    }

    const user = await User.findByPk(userID)
    const gt = await GroupTraining.findByPk(groupTrainID)
    const workout = await Workout.create({type: type, date: date, likes: 0})

    await workout.setUser(user)
    await gt.addWorkout(workout)
}



exports.createSession = (exercise, workout, wei, set, rep) => {
    return Session.create({
        weight: wei,
        sets: set,
        reps: rep
    }).then(newSession => {
        newSession.setExercise(exercise)
        workout.addSession(newSession)
        return newSession
    })
}

exports.createExercise = (name, caloriesUpon, calories) => {
    return Exercise.create({
        name: name,
        define_calories_upon: caloriesUpon,
        calories: calories
    }).then(newExercise => {
        return newExercise
    })
}

exports.createGroupTraining = (name, duration, calories) => {
    return GroupTraining.create({
        name: name,
        duration: duration,
        calories_per_minute: calories
    }).then(newGT => {
        return newGT
    })
}
exports.addSession = (session) => {
    return Workout.findByPk(1)
        .then(workout => {
            workout.addSession(session)
        })
        .catch(error => {console.log(error)})
}

exports.validateUser = (users, email, password) => {
    var userToReturn;
    users.forEach(function (user) {
        if (user.dataValues.email == email && validatePassword(user, password)) { //Testar bara ska sen gå igenom hashningen
            userToReturn = user;
        }
    })
    if(userToReturn == undefined){
        return null;
    }
    else return userToReturn;
}

function validatePassword (user, password) {
    var hash = crypto.pbkdf2Sync(password, user.dataValues.salt, 1000, 64, `sha512`).toString(`hex`);
    return user.dataValues.hash === hash; //Returnerar true om det är samma lösen annars ej
}

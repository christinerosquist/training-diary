const crypto = require('crypto');
const seq = require("./sequelize.js")
const {User, UserInfo, Session, Workout, Exercise, GroupTraining, MuscleMassProgress, WeightProgress, sequelize} = seq()

exports.createUser = (email, password) => {
    var salt = crypto.randomBytes(16).toString('hex');
    return User.create({
        //Skapar ett unikt saltvärde för en specifik användare
        salt: salt,
        // hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
        hash: crypto.pbkdf2Sync(password, salt,1000, 64, `sha512`).toString(`hex`), //Hashar
        email: email
    }).then(data => {return data})
}
exports.createUserInfo = (user, name, sex, height, weight) => {
    return UserInfo.create({
        user_id: user.dataValues.id,
        name: name,
        sex: sex,
        height: parseInt(height),
        current_weight: parseInt(weight)
    }).then(data => {return data})

}

exports.getUserInfo = (id) => {
    return UserInfo.findByPk(id)
        .then(data => {return data})
        .error(e => console.log(e))
}

// Get all workouts from user with userId
exports.getWorkouts = (user_id) => {
    return User.findByPk(user_id) // user1
        .then(user => {
            return user.getSeqWorkouts()
                .then(workouts => {
                    return workouts
                })
            })
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

// Get all sessions that belongs to the workout with workoutId
exports.getSessions = (workout_id) => {
    return Workout.findByPk(workout_id)
        .then(workout => {
            return workout.getSessions()
                .then(sessions => {
                    console.log("number of sessions: " + sessions.length)
                    console.log(sessions)
                    return sessions
                })
        })
        .catch(error => {console.log(error)})
}

// Get the 5 latest workouts that has been added
exports.getFeedWorkouts = () => {
    return Workout.findAll({limit: 5, order: [['date', 'DESC']]})
        .then(workouts => {return workouts})
        .catch(error => console.log(error))
}

// Get the muscle progress entries of a user with user_id
exports.getMuscleProgress = (user_id) => {
    return User.findByPk(user_id)
        .then(user => {
            return user.getMMPs()
                .then(progress => {
                    return progress
                })
        })
        .catch(e => console.log(e))
}

// Get the weight progress of a user with user_id
exports.getWeightProgress = (user_id) => {
    return User.findByPk(user_id)
        .then(user => {
            return user.getWPs()
                .then(progress => {
                    return progress
                })
        })
        .catch(e => console.log(e))
}

exports.getGroupTraining = (id) => {
    return GroupTraining.findByPk(id)
        .then(group_training => {
            return group_training
        })
        .catch(error => console.log(error))
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

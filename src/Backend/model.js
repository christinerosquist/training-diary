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
    }).then(data => {
        return data
    }).catch(e => console.log(e))
}
exports.createUserInfo = (user_id, name, sex, height, image, deletehash) => {
    return UserInfo.create({
        user_id: user_id,
        name: name,
        sex: sex,
        height: parseInt(height),
        image: image,
        deletehash: deletehash
    }).then(data => {
        return data
    }).catch(e => console.log(e))

}

exports.getUserInfo = (id) => {
    return UserInfo.findByPk(id)
        .then(data => {return data})
        .error(e => console.log(e))
}

exports.getUserInfoByUserId = (userId) => {
    return UserInfo.findAll({
        where:{
            user_id : userId
        }
    }).then(data => {return data})
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
        return workouts
        })
        .catch(error => {console.log(error)})
}

exports.getAllUsers = () => {
    return User.findAll() // HÄR KAN MAN ÄNDRA FÖR ATT TESTA OLIKA TABELLER
        .then(data => {
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
                    console.log(sessions)
                    return sessions
                })
        })
        .catch(error => {console.log(error)})
}

function getExercise(exerciseId) {
    return Exercise.findByPk(exerciseId)
        .then(exercise =>{
            return exercise
        })
        .catch(error => console.log(error));
}

exports.getExercises = async (sessions) => {
    var i;
    var exercises = [];
    for(i = 0; i < sessions.length; i++){
        var session = sessions[i];
        var exerciseId = session.dataValues.exercise_id;
        var exercise = await getExercise(exerciseId);
        exercises.push(exercise);
    }
    return exercises;
}

exports.getAllExercises = () => {
    return Exercise.findAll()
        .then(exercises => {
            return exercises
        })
        .catch(error => {console.log(error)})
}

// Get the 5 latest workouts that has been added
exports.getFeedWorkouts = () => {
    return Workout.findAll({limit: 5, order: [['date', 'DESC']]})
        .then(workouts => {return workouts})
        .catch(error => console.log(error))
}

exports.getFeedInfo = async (workouts) => {
    var i;
    var feedInfo = [];
    for(i = 0; i < workouts.length; i++){
        var workout = workouts[i];
        var userId = workout.dataValues.user_id;
        var user = await this.getUser(userId);
        var userInfo = await this.getUserInfoByUserId(userId);

        var workoutType;
        if(workout.dataValues.type === "Gym Session"){ //Get the session
             workoutType = await this.getSessions(workout.dataValues.id);
        }
        else{ //If workout is a group training
            workoutType = await this.getGroupTraining(workout.dataValues.group_training_id);
        }
        var infoObject = {user: user, userInfo: userInfo, workout: workout, workoutType: workoutType}
        feedInfo.push(infoObject);
    }
    return feedInfo;
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

exports.addProgress = (user_id, mode, date, data) => {
    if(mode === 'weight') {
        return WeightProgress.create({
            user_id: user_id,
            date: date,
            kg: data
        }).then(newprogress => {
            return newprogress
        }).catch(e => console.log(e))
    } else {
        return MuscleMassProgress.create({
            user_id: user_id,
            date: date,
            percentage: data
        }).then(newprogress => {
            return newprogress
        }).catch(e => console.log(e))
    }
}

// create a workout with groupTraining/sessions for a user
exports.makeWorkout = async (userID, groupTraining, sessions, date) => {
    let type = "Gym Session"
    if(groupTraining !== null) {
        type = "Group Training"
    }

    const user = await User.findByPk(userID)
    const workout = await Workout.create({type: type, date: date, likes: 0})
    await workout.setUser(user)

    if(groupTraining !== null) {
        const gt = await GroupTraining.findByPk(groupTraining.id)
        await gt.addWorkout(workout)
    } else if(sessions !== null) {
        sessions.map(async (sess) => {
            let weight, sets, reps, duration;
            if(sess.cardio) {
                weight = sets = reps = null
                duration = sess.duration
            } else {
                [weight, sets, reps] = [sess.weight, sess.sets, sess.reps]
                duration = null
            }
            const exercise = await Exercise.findByPk(sess.exerciseId)
            let session = await Session.create({
                    weight: weight,
                    sets: sets,
                    reps: reps,
                    duration: duration
                })
            await session.setExercise(exercise) // give session an exercise foregin key
            await session.setWorkout(workout) // give session a workout foreign key
        })
    }
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
        if (user.dataValues.email === email && validatePassword(user, password)) {
            userToReturn = user;
        }
    })
    if(userToReturn === undefined){
        return null;
    }
    else return userToReturn;
}

function validatePassword (user, password) {
    var hash = crypto.pbkdf2Sync(password, user.dataValues.salt, 1000, 64, `sha512`).toString(`hex`);
    return user.dataValues.hash === hash; //Returnerar true om det är samma lösen annars ej
}

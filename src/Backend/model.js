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

// Get all workouts from user
exports.getWorkouts = (userId) => {
    return User.findByPk(userId) // user1
        .then(user => {
            return user.getWorkouts()
                .then(workouts => {
                    return workouts
                })
        })
        .catch(error => {console.log(error)})
}

// Get all sessions that belongs to the workout with workoutId
exports.getSessions = (workout_id) => {
    return Workout.findByPk(workout_id)
        .then(workout => {
            return workout.getSessions()
                .then(sessions => {
                    return sessions
                })
        })
        .catch(error => {console.log(error)})
}

exports.getAllWorkouts = () => {
    return Workout.findAll({limit: 1, reverse: true})
        .then(workouts => {return workouts})
        .catch(error => console.log(error))
}

exports.getGroupTraining = (id) => {
    return GroupTraining.findByPk(id)
        .then(group_training => {
            return group_training
        })
        .catch(error => console.log(error))
}

exports.createSession = (eid, wei, set, rep) => {
    return Session.create({
        exercise_id: eid,
        weight: wei,
        sets: set,
        reps: rep
    }).then(newSession => {
        return newSession
    })
}
exports.addSession = (session) => {
    return Workout.findByPk(1)
        .then(workout => {
            workout.addSession(session)
        })
        .catch(error => {console.log(error)})
}
exports.createSession = (eid, wei, set, rep) => {
    return Session.create({
        exercise_id: eid,
        weight: wei,
        sets: set,
        reps: rep
    }).then(newSession => {
        return newSession
    })
}
exports.addSession = (session) => {
    return Workout.findByPk(1)
        .then(workout => {
            workout.addSession(session)
        })
        .catch(error => {console.log(error)})
}

exports.getUsers = () => {
    return User.findAll() // HÄR KAN MAN ÄNDRA FÖR ATT TESTA OLIKA TABELLER
        .then(data => { return data })
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


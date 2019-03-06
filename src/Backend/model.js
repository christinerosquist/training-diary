const crypto = require('crypto');
const seq = require("./sequelize.js")
const {User, UserInfo, Session, Workout, Exercise, GroupTraining, MuscleMassProgress, WeightProgress, sequelize} = seq()

exports.createUser = (email, password, name, sex, height, weight) => {
    var salt = crypto.randomBytes(16).toString('hex');
    return User.create({
        id: 1, //Ändra så att den genererar en ny GUID typ varje gång
        //Skapar ett unikt saltvärde för en specifik användare
        salt: salt,
        // hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
        hash: crypto.pbkdf2Sync(password, salt,1000, 64, `sha512`).toString(`hex`), //Hashar
        email: email
    }).then(data => {return data})
}

exports.getLatestActivities = () => {
    return User.findByPk(1) // HÄR KAN MAN ÄNDRA FÖR ATT TESTA OLIKA TABELLER
        .then(user => {
            user.getWorkouts()
            .then(works => {
                console.log(works)
            })
        })
        .catch(error => {console.log(error)})
}

// Log all workouts of a user
exports.getWorkouts = () => {
    return User.findByPk(1) // user1
        .then(user => {
            user.getWorkouts()
            .then(workouts => {
                console.log("workouts")
                console.log(workouts)
                return workouts
            })
        })
        .catch(error => {console.log(error)})
}

exports.getSessions = () => {
    return Workout.findByPk(1)
        .then(workout => {
            workout.getSessions()
                .then(sessions => {
                    console.log("sessions")
                    console.log(sessions)
                    return sessions
                })
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
    console.log("Got here")
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


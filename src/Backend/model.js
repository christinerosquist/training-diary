const seq = require("./sequelize.js")
const {User, UserInfo, Session, Workout, Exercise, GroupTraining, MuscleMassProgress, WeightProgress, sequelize} = seq()


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
exports.getSessions = (workoutId) => {
    return Workout.findByPk(workoutId)
        .then(workout => {
            return workout.getSessions()
                .then(sessions => {
                    return sessions
                })
        })
        .catch(error => {console.log(error)})
}

exports.createSession = () => {
    return Session.create({
        exercise_id: 1,
        weight: 14,
        sets: 3,
        reps: 5
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
        if (user.dataValues.email == email && user.dataValues.password == password) { //Testar bara ska sen gå igenom hashningen
            userToReturn = user;
        }
    })
    if(userToReturn == undefined){
        return null;
    }
    else return userToReturn;
}

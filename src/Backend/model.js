
const seq = require("./sequelize.js")
const {User, UserInfo, Session, Workout, Exercise, GroupTraining, MuscleMassProgress, WeightProgress, sequelize} = seq()

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

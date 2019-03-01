
const seq = require("./sequelize.js")
const {User, UserInfo, Session, Workout, Exercise, GroupTraining, MuscleMassProgress, WeightProgress} = seq()

exports.getLatestActivities = () => {
    return WeightProgress.findAll() // HÄR KAN MAN ÄNDRA FÖR ATT TESTA OLIKA TABELLER
        .then(data => { console.log(data) })
        .catch(error => {console.log(error)})
}

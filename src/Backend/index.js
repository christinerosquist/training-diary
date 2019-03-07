const setupBoilerplate = require('./boilerplate/setup');

const { app, io, listen } =  setupBoilerplate();
const port = 5000;

// Bind REST controller to /api/*
const router = require('./controllers/rest.controller.js');
app.use('/api', router);

// Registers socket.io controller
const socketController = require('./controllers/socket.controller.js');
io.on('connection', socket => {
    socketController(socket, io);
});

const model = require('./model.js');
let gtID = "1"
let userID = "1"

model.makeWorkout(userID, gtID, "12 mars 2019")

// model.getGroupTrainings().then((gts) => {
//     console.log(gts)
// })
// model.getAllWorkouts().then(wos => {
//     console.log(wos)
// })
// model.getUser(userID).then(user => {
//     model.createWorkout(user, model.getGroupTraining(gtID), "12 mars 2019").then(wo => {
//         model.setWorkoutUser(wo, user).then(() => {
//             console.log("workout")
//             console.log(wo)
//         })
//     })
// })



listen(port, () => {
    console.log("server listening on port", port);
});

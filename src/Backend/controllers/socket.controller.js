const model = require('../model.js');
const express = require('express');
const router = express.Router();

module.exports = (socket, io) => {

    // add a workout to the database
    socket.on('addWorkout', async req => {
        const workout = await model.makeWorkout(req.userId, req.group_training, req.sessions, req.date)
        io.sockets.emit('updateFeed')
    });

    // upvote an existing workout
    socket.on('upvote', async req => {
        const updated = await model.upvoteWorkout(req.workoutId)
        io.sockets.emit('upvote', {workoutId: updated.id, upvotes: updated.likes})
    });
}

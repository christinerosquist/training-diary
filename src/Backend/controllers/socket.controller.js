const model = require('../model.js');
const express = require('express');
const router = express.Router();

module.exports = (socket, io) => {

    socket.on('example', req => {
        // model.setBookedBy(req.timeslot, req.booked_by).then(updated => {
        //     io.sockets.emit('update', {event: 'book', timeslot: updated})
        // })
    });

    socket.on('addWorkout', async req => {
        const workout = await model.makeWorkout(req.userId, req.group_training, req.sessions, req.date)
        io.sockets.emit('updateFeed')
    });
}

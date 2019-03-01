const model = require('../model.js');

module.exports = (socket, io) => {

    socket.on('example', req => {
        // model.setBookedBy(req.timeslot, req.booked_by).then(updated => {
        //     io.sockets.emit('update', {event: 'book', timeslot: updated})
        // })
    });
}

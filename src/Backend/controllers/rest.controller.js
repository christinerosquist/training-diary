const model = require("../model.js");
const express = require('express');
const router = express.Router();

router.get('/getworkouts', async function (req, res) {
    const workouts = await model.getLatestActivities()

    res.json({
        workouts: workouts
    });
});

router.get('/profile/:id', async function (req, res) {
    res.json({
    });
});

router.get('/addworkout', async function (req, res) {
    res.json({
    });
});

router.post('/addprogress', async function (req, res) {
    res.json({
    });
});

router.get('/testconnection', async function (req, res) {
    res.json({
        express: "Hej från backend!"
    });
});

module.exports = router; // export the router with the functions for the urls.
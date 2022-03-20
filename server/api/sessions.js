const express = require('express');
const Session = require('../models/session');
const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const sessions = await Session.find();
        res.json(sessions)
    } catch (error) {
        res.json({ message: error })
    }
});

router.get('/:roomid', async (req, res) => {

    try {
        const getSession = await Session.findOne({ roomid: req.params.roomid });
        res.json(getSession);
    } catch (error) {
        res.json({ message: error });
    }
})

router.post('/', async (req, res) => {

    const createdSession = new Session({
        roomid: req.body.roomid,
        questions: req.body.questions,
        date: req.body.date,
        host: req.body.host,
        difficulty: req.body.difficulty
    });

    try {
        const postedSession = await createdSession.save();
        res.json(postedSession);
    } catch (error) {
        res.json({ message: error });
    }

});

router.delete('/:roomid', async (req, res) => {

    try {
        const wipedSession = await Session.deleteOne({ roomid: req.params.roomid });
        res.json(wipedSession);
    } catch (error) {
        res.json({ message: error })
    }
});

module.exports = router;
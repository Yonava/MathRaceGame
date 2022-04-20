const express = require('express');
const Session = require('../models/sessionSchema');
const router = express.Router();

router.get('/', async (req, res) => {

    try {
      const sessions = await Session.find();
      res.json(sessions)
    } catch (error) {
      res.json({ message: error })
    };

});

router.get('/:roomid', async (req, res) => {

    try {
      const getSession = await Session.findOne({ roomid: req.params.roomid });
      res.json(getSession);
    } catch (error) {
      res.json({ message: error });
    };

});

router.post('/', async (req, res) => {

  const createdSession = new Session({
    roomid: req.body.roomid,
    questions: req.body.questions,
    date: req.body.date,
    host: req.body.host,
    difficulty: req.body.difficulty,
    finalPositions: req.body.finalPositions
  });

  try {
    const postedSession = await createdSession.save();
    res.json(postedSession);
  } catch (error) {
    res.json({ message: error });
  };

});

router.delete('/:roomid', async (req, res) => {

  try {
    const wipedSession = await Session.deleteOne({ roomid: req.params.roomid });
    res.json(wipedSession);
  } catch (error) {
    res.json({ message: error })
  };
  
});

router.put('/:roomid/start', async (req, res) => {

  try {
    const updatedSession = await Session.updateOne(
      { roomid: req.params.roomid }, 
      { $set: 
      { hasBegun: req.body.hasBegun } }
    );
    res.json(updatedSession);
  } catch (error) {
    res.json({ message: error })
  }
  
});

router.put('/:roomid', async (req, res) => {

  try {
    const updatedFinalPos = await Session.updateOne(
      { roomid: req.params.roomid }, 
      { $set: 
      { finalPositions: req.body.finalPositions } }
    );
    res.json(updatedFinalPos);
  } catch (error) {
    res.json({ message: error })
  }
  
});

module.exports = router;
const express = require('express');
const UserBase = require('../models/userSchema');
const router = express.Router();

router.get('/', async (req, res) => {

  try {
    const users = await UserBase.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  };

});

router.get('/:username', async (req, res) => {

  try {
    const getUser = await UserBase.findOne({ username: req.params.username });
    res.json(getUser);
  } catch (error) {
    res.json({ message: error });
  };

})

router.post('/', async (req, res) => {

  const createdUser = new UserBase({
    username: req.body.username,
    password: req.body.password,
    gameData: req.body.gameData,
    accountCreationDate: req.body.accountCreationDate,
    accessLevel: req.body.accessLevel
  });

  try {
    const postUser = await createdUser.save();
    res.json(postUser);
  } catch (error) {
    res.json({ message: error });
  };

});

router.delete('/:username', async (req, res) => {

  try {
    const deletedUser = await UserBase.deleteOne({ username: req.params.username });
    res.json(deletedUser);
  } catch (error) {
    res.json({ message: error });
  };

});

module.exports = router;
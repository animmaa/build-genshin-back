const userRouter = require('express').Router();

const user = require('../models/user-model');

userRouter.post('/createuser', async (req, res) => {
  await user.createUser(req.body);
  return res.status(201).json('user créé');
});

module.exports = userRouter;

const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req,res) => {
   const { error } = validateLogin(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({ email: req.body.email });
   if(!user) return res.status(400).send('invalid email or password');

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if(!validPassword) return res.status(400).send('invalid email or password');
      
   const token = user.generateAuthToken();
   res.send(token);
});


function validateLogin(login) {
  const schema = {
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(255).required()
  }

  return Joi.validate(login, schema);
}

module.exports = router;
const bcrypt = require('bcrypt'); 
const _ = require('lodash');
const Joi = require('joi');
const mongoose = require('mongoose');
const { User, validateUser } = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {

     const { error } = validateUser(req.body);
       if(error) return res.status(400).send(error.details[0].message);

     let user = await User.findOne({ email: req.body.email});
       if(user) return res.status(400).send('user already registered');

     user = new User({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
     });
     //or user=new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
         
        const token = user.generateAuthToken();
        const infoToUser = _.pick(user, ['_id', 'name', 'email']);
         res.header('x-auth-token', token).send(infoToUser);
});

module.exports = router;
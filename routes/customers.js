const mongoose = require('mongoose');
const express = require('express');
const { Customer, validateCustomer } = require('../models/customer');

const router = express.Router();

router.get('/', async (req, res)=>{
    const customers = await Customer.find()
    .sort('name');
    res.send(customers);
});

router.get('/:id', async (req,res) => {

    const customer = Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('customer with given id not found');

    res.send(customer);   
});

router.post('/', async (req, res) => {
    
    const { error } = validateCustomer(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
     });

        customer = await customer.save();
        res.send(customer);      
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
   const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name}, {new: true});

    if(!customer) return res.status(404).send('customer with given id not found');
        
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await  Customer.findOneAndDelete(req.params.id); 
    if(!customer) return res.status(404).send('customer with given id not found');

    res.send(customer);
});

module.exports = router;
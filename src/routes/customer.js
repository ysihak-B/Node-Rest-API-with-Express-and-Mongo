const { isValidObjectId } = require('mongoose')
const CustomerModel = require('../models/customer.model')
const express = require('express')
const router = express.Router()

//create a new customer
// post localhost:3000/customer
router.post('/customer', (req, res) => {
    if (Object.entries(req.body).length === 0){
        res.status(400).send('Request body is missing')
    } 
    else {
        let model = new CustomerModel(req.body)
        model.save()
        .then(doc => {
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    
})

router.get('/customer', (req, res) => {
    CustomerModel.find()
    .then(doc => {
        if(doc.length === 0){
            res.status(200).send('There are no customers!!!')
        }
        else {
            res.json(doc)
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/customer/:email', (req, res) => {
    CustomerModel.findOne({email:req.params.email})
        .then(doc => {
            if(!doc){
                res.status(200).send('There is no customer with this email!!!')
            }
            else {
                res.json(doc)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.put('/customer', (req, res) => {
    if(!req.query.email){
        return res.status(400).send('Missing url query parameter: email')
    }
    CustomerModel.updateOne({email: req.query.email}, req.body, {new: true})
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.delete('/customer', (req, res) => {
    if(!req.query.email){
        return res.status(400).send('Missing url query parameter: email')
    }
    CustomerModel.findOneAndDelete({email: req.query.email})
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


module.exports = router
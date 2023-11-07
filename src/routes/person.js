const express = require('express')
const router = express.Router()

router.get('/person', (req, res) => {
    if (req.query.name) {
        res.send(`You have requested for name = ${req.query.name}`)
    } else {
        res.send('You have requested a person')
    }
})

router.get('/person/:name', (req, res) => {
    res.send(`You have requested for ${req.params.name}`)
})

router.get('/error', (req, res) => {
    throw new Error('This is a forced error!!!')
})

module.exports = router
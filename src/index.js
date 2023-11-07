const express = require('express')
const app = express();
const personRoute = require('./routes/person')
const customerRoute = require('./routes/customer')

const path = require('path')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

//middleware
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})

app.use(personRoute)
app.use(customerRoute)
app.use(express.static('public'))

// handle errors
app.use((req, res, next) => {
    res.status(404).send('The page you are looking for is not found!!!')
})

// console.log(path.join(__dirname, '../public/500.html'))

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started ${PORT}`))
const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/rest-api-workshop`)

const db = mongoose.connection
db.on('error', console.error.bind(console,'mongodb connection error:'))
db.once('open', () =>{
    console.log('Connected to MongoDB')
})

let customerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Customer', customerSchema)
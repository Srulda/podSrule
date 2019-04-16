const mongoose = require('mongoose')
const Schema = mongoose.Schema

const someSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: String,
    age: Number
})

const Somthing = mongoose.model("Somthing", someSchema)
module.exports = Somthing
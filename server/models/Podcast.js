const mongoose = require('mongoose')
const Schema = mongoose.Schema

let podcastSchema = new Schema({
    
})

const Podcast = mongoose.model("Podcast", podcastSchema)
module.exports = Podcast
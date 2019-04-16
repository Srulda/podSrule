const mongoose = require('mongoose')
const Schema = mongoose.Schema

let podcastSchema = new Schema({
    podName: String,
    episodeName: String,
    id: String,
    image: String,
    audio_link: String,
    audio_length: Number,
    genres : [Number],
    description: String,
    played: Boolean,
    saved: Boolean
})

const Podcast = mongoose.model("Podcast", podcastSchema)

module.exports = Podcast
const express = require('express')
const router = express.Router()
const unirest = require('unirest')
const request = require('request')
const APIKey = require('../../config')

const Podcast = require('../models/Podcast')

router.get('/sanity', function (req, res) {
    res.send('OK!')
})

router.get('/podcast/:podcastName', function (req, res) {

    const podName = req.params.podcastName

    unirest.get(`https://listen-api.listennotes.com/api/v2/search?q=${podName}`)
        .header('X-ListenAPI-Key', APIKey)
        .end(function (response) {
            res.send(response.body.results)
        })
        
})





module.exports = router
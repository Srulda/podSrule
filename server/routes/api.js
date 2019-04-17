const express = require('express')
const router = express.Router()
const unirest = require('unirest')
const APIKey = require('../../config')
const request = require('request-promise-native')

const Podcast = require('../models/Podcast')

router.get('/sanity', function (req, res) {
    res.send('OK!')
})

const mapGenres = async function (genresIds) {

    const genresNames = []

    let options = {
        uri: `https://listen-api.listennotes.com/api/v2/genres`,
        headers: {
            'X-ListenAPI-Key': APIKey
        }
    }

    await request(options, function (error, response, body) {
        const genres = JSON.parse(body).genres

        for (let i in genresIds) {
            for (let j in genres) {
                if (genresIds[i] === genres[j].id) {
                    genresNames.push(genres[j].name)
                }
            }
        }
    })

    return genresNames
}

const createPodcastDocument = async function (podName, episodeName, id, image,
    audioLink, audioLength, genres, description, played, saved) {

    if ((typeof genres[0]) === 'number') {
        genres = await mapGenres(genres)
    }

    const podcastDoc = new Podcast({
        podName,
        episodeName,
        id,
        image,
        audioLink,
        audioLength,
        genres,
        description,
        played,
        saved
    })

    return podcastDoc
}




router.get('/podcast/:podcastName', async function (req, res) {

    const podName = req.params.podcastName

    let podcasts = []

    let options = {
        uri: `https://listen-api.listennotes.com/api/v2/search?q=${podName}&sort_by_date=0`,
        headers: {
            'X-ListenAPI-Key': APIKey
        }
    }

    await request(options, async function (error, response, body) {
        let podcastsRec = JSON.parse(body).results

        for (let i = 0; i < 6; i++) {
            let podcast = await createPodcastDocument(
                podcastsRec[i].podcast_title_original, podcastsRec[i].title_original,
                podcastsRec[i].id, podcastsRec[i].image, podcastsRec[i].audio,
                podcastsRec[i].audio_length, podcastsRec[i].genres,
                podcastsRec[i].description_original, false, false)
            podcasts.push(podcast)
        }

        res.send(podcasts)
    })
})


router.post(`/podcast`, async function (req, res) {
    const podcast = req.body
    const newPodcast = await createPodcastDocument(podcast.podName, podcast.episodeName,
        podcast.id, podcast.image, podcast.audioLink, podcast.audioLength,
        podcast.genres, podcast.description, podcast.saved, podcast.played)

    let save = newPodcast.save()
    save.then(res.send(`${newPodcast.podName} has been saved to database`))
})


router.delete(`/podcast/:podcastID`, function (req, res) {
    let id = req.params.podcastID

    Podcast.deleteOne({
        id: id
    }, function (error, response) {
        console.log(response)
        res.send(`Deleted podcast with id of ${id} from database.`)
    })
})

router.get('/podcasts', function (req, res) {
    Podcast.find({}, function (err, podcasts) {
        res.send(podcasts)
    })
})




router.get('/discover/:maxLength/:language/:genreName/:genreID', async function (req, res) {

    let genreName = req.params.genreName
    let maxLength = req.params.maxLength
    let genreID = req.params.genreID
    let language = req.params.language
    let discoPodcasts = []
    let discoUrl
    if (maxLength === 90) {
        discoUrl = `https://listen-api.listennotes.com/api/v2/search?q=${genreName}&sort_by_date=0&${language}&len_min${maxLength}&genre_ids=${genreID}&safe_mode=1`
    } else {
        discoUrl = `https://listen-api.listennotes.com/api/v2/search?q=${genreName}&sort_by_date=0&${language}&len_max${maxLength}&genre_ids=${genreID}&safe_mode=1`
    }
    let discover = {
        uri: discoUrl,
        headers: {
            'X-ListenAPI-Key': APIKey
        }
    }
    await request(discover, async function (error, response, body) {
        let discoPodcastRec = JSON.parse(body).results

        for (let i = 0; i < 6; i++) {
            let podcast = await createPodcastDocument(
                discoPodcastRec[i].podcast_title_original, discoPodcastRec[i].title_original,
                discoPodcastRec[i].id, discoPodcastRec[i].image, discoPodcastRec[i].audio,
                discoPodcastRec[i].audio_length, discoPodcastRec[i].genres,
                discoPodcastRec[i].description_original, false, false)
            discoPodcasts.push(podcast)
        }
        res.send(discoPodcasts)
    })
})

module.exports = router
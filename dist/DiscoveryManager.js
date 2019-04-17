class DiscoveryManager {
    constructor() {
        this._time
        this._lang
        this._genre
        this._genreId
        this._langArray = ["Hebrew", "English", "Spanish", "German", "Italian"]
        this._genreIdAndName = [
            {genre: "sports", genId: 77 },
            {genre: "technology", genreId: 127},
            {genre: "tv & Film", genreId: 68 },
            {genre: "religion & spirituality", genreId: 69 },
            {genre: "eduacation", genreId: 111 },
            {genre: "society & culture", genreId: 122  },
            {genre: "music", genreId: 134  },
            {genre: "history", genreId: 125  }
        ]
        this._discoveredPodcasts = []

    }

    get discoveredPodcasts() {
        return this._discoveredPodcasts
    }

    set time(time){
        this._time = time
    }
    set lang(lang){
        this._lang = lang
    }
    set genre(genre){
        this._genre = genre
    }
    set genreId ( genreId){
        this._genreId = genreId

    }

    async discoverPodcasts() {

        this._discoveredPodcasts = await $.get(`/discover/${this._time}/${this._lang}/${this._genre}/${this._genreId}`)
    }
    
}
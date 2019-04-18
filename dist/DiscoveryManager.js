class DiscoveryManager {
    constructor() {
        this._time
        this._lang
        this._genre
        this._genreId


        this._langArray = [
            {language:"Hebrew", pic: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png"},
            {language: "English", pic: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"},
            {language: "Spanish", pic: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1125px-Flag_of_Spain.svg.png"},
            {language: "German", pic: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png"},
            {language: "Italian", pic: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png"}
                            ]



        this._genreIdAndName = [
            {genre: "sports", genreId: 77, i: `far fa-futbol`},
            {genre: "technology", genreId: 127, i:`fas fa-laptop-code`},
            {genre: "tv & Film", genreId: 68, i:`fas fa-video`},
            {genre: "religion & spirituality", genreId: 69, i: `fas fa-hamsa` },
            {genre: "eduacation", genreId: 111, i: `fas fa-user-graduate`},
            {genre: "society & culture", genreId: 122, i: `fas fa-globe-asia`},
            {genre: "music", genreId: 134, i:  `fas fa-music`},
            {genre: "history", genreId: 125, i: `fas fa-monument`}
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
        for(let pod of this._discoveredPodcasts){
            pod.audioManager = new AudioManager(pod.audioLink, pod.audioLink)
        }
    }

    getCorrectDiscovery(id){
        for(let pod of this._discoveredPodcasts){
            if(id == pod.id){
                return pod
            }
        }
    }
    
}
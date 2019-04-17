class DiscoveryManager {
    constructor() {
        this._discoveredPodcasts = []
    }

    get discoveredPodcasts() {
        return this._discoveredPodcasts
    }

    async discoverPodcasts(time, language, genre, genreId) {

        let a = await $.get(`/discover/${time}/${language}/${genre}/${genreId}`)
        console.log(a)
    }
    
}
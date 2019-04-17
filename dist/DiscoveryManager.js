class DiscoveryManager {
    constructor() {
        this._discoveredPodcasts = []
    }

    get discoveredPodcasts() {
        return this._discoveredPodcasts
    }

    async discoverPodcasts(time, language, genre, genreId) {
        this._discoveredPodcasts = await $.get(`/discover/${time}/${language}/${genre}/${genreId}`)
    }
    
}
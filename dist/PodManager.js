class PodManager {
constructor(){
    this.favoritesPlaylist = []
    this.searchPodcast = []
}

async getPodData(podName){
    let getData = await $.get(`/podcast/${podName}`)
    this.searchPodcast.push(getData)
    
}

async getDataFromDB() {
    let getDataDB = await $.get('/podcasts')
        this.favoritesPlaylist = getDataDB
    }

async savePod(podName){


}




}




saveCity(cityName) {
    for (let city of this.cityData) {
        if (city.name === cityName) {
            $.post(`/city`, city, function (response) {})
        }
    }
}
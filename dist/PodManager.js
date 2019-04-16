class PodManager {
constructor(){
    this.favoritesPlaylist = []
    this.searchPodcast = []
}

async getPodData(podName){
    let getData = await $.get(`/podcast/${podName}`)
    console.log(getData)
    this.searchPodcast = getData 
    
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

removeCity(cityName) {
    $.ajax({
        url: `/city/${cityName}`,
        method: "DELETE",
        success: function (response) {}
    })
}

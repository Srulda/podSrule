class PodManager {
constructor(){
    this.favoritesPlaylist = []
    this.searchPodcast = []
}

async getPodData(podName){
    let getData = await $.get(`/podcast/${podName}`)
    this.searchPodcast = getData 
    
}

async getDataFromDB() {
    let getDataDB = await $.get('/podcasts')
        this.favoritesPlaylist = getDataDB
    }

async savePod(podName){


}




}



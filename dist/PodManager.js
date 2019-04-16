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

async savePod(podID){
   await $.post(`/podcast`, podID)
   }

deletePod(podID) {
    $.ajax({
        url: `/podcast/${podID}`,
        method: "DELETE",
        success: function (response) {}
    })
}

}
class PodManager {
    constructor() {
        this.favoritesPlaylist = []
        this.searchPodcast = []
    }


    async getPodData(podName) {
        let getData = await $.get(`/podcast/${podName}`)
        console.log(getData)
        this.searchPodcast = getData
    }


    async getDataFromDB() {
        let getDataDB = await $.get('/podcasts')
        this.favoritesPlaylist = getDataDB
    }

    async savePod(podID) {
      for (let pod of this.searchPodcast) {
            if (pod.id == podID) {
                if (pod.played || pod.saved) {
                    return
                } else {
                   $.post(`/podcast`, pod, function(response){
                      
                    })
                }
            }
        }
 }

    deletePod(podID) {
        console.log(podID)
        $.ajax({
            url: `/podcast/${podID}`,
            method: "DELETE",
            success: function (response) {}
        })
    }
}
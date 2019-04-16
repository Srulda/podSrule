class PodManager {
    constructor() {
        this.savedPodcast = []
        this.listenedPodcast = []
        this.searchPodcast = []
    }

    async getPodData(podName) {
        let getData = await $.get(`/podcast/${podName}`)
        this.searchPodcast = getData
    }

    async getDataFromDB() {
        let getDataDB = await $.get('/podcasts')
        for (let pod of getDataDB) {
            if (pod.saved) {
                this.savedPodcast.push(pod)
            }
            if (pod.played) {
                this.listenedPodcast.push(pod)
            }
        }
    }

    async savePod(podID) {
        for (let pod of this.searchPodcast) {
            if (pod.id == podID) {
                if (pod.saved) {
                    return
                } else if (pod.played) {
                    pod.saved = true
                    this.savedPodcast.push(pod)
                } else {
                    pod.saved = true
                    this.savedPodcast.push(pod)
                    $.ajax({
                        url: `/podcast`,
                        method: "POST",
                        traditional: true,
                        data: pod,
                        success: function (response) {}
                    })
                }
            }
        }
    }


deletePod(podID) {
    $.ajax({
        url: `/podcast/${podID}`,
        method: "DELETE",
        success: function (response) {}
    })
}


}




class PodManager {
    constructor() {
        this.savedPodcast = []
        this.listenedPodcast = []
        this.searchPodcast = []
    }

    async getPodData(podName) {
        let getData = await $.get(`/podcast/${podName}`)
        this.searchPodcast = getData
        for(let pod of this.searchPodcast){
            pod.audioManager = new AudioManager(pod.audioLink, pod.audioLink)
        }
        console.log(this.searchPodcast)
    }

     getCorrectPod(id){
        for(let pod of this.searchPodcast){
            if(id == pod.id){
                return pod
            }
        }
    }

    getCorrectSavedPod(id){
        for(let pod of this.savedPodcast){
            if(id == pod.id){
                return pod
            }
        }
    }

    getCorrectListendPod(id){
        for(let pod of this.listenedPodcast){
            if(id == pod.id){
                return pod
            }
        }  
    }
    async getDataFromDB() {
        let getDataDB = await $.get('/podcasts')
        for(let pod of getDataDB){
            pod.audioManager = new AudioManager(pod.audioLink, pod.audioLink)
        }

        for (let pod of getDataDB) {
            console.log(pod)
            if (pod.saved) {
                this.savedPodcast.push(pod)
            }
            if (pod.played) {
                this.listenedPodcast.push(pod)
            }
        }
        console.log(this.listenedPodcast)
    }

    async savePod(podID) {
        for (let pod of this.searchPodcast) {
            if (pod.id == podID) {
                console.log('before')
                if (pod.saved) {
                    return
                } else if (pod.played) {
                    pod.saved = true
                    this.savedPodcast.push(pod)
                    $.ajax({
                        url: `/saved/${podID}`,
                        method: "PUT",
                        success: function (response) {}
                    })
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
        console.log(this.savedPodcast)
    }

    savedPlayedPod(podID) {
        for (let pod of this.searchPodcast) {
            if (pod.id == podID) {
                console.log('before')
                if (pod.played) {
                    return
                } else if (pod.saved) {
                    pod.played = true
                    this.listenedPodcast.push(pod)
                    $.ajax({
                        url: `/played/${podID}`,
                        method: "PUT",
                        success: function (response) {}
                    })
                } else {
                    pod.played = true
                    this.listenedPodcast.push(pod)
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




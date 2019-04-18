const podManager = new PodManager()
const audioManager = new AudioManager()
const renderer = new Renderer()
const discoveryManager = new DiscoveryManager()

$(document).ready(function () {
    $('.tabs').tabs()
    $('.sidenav').sidenav({
        edge: 'right'
    })
})


const handleSearch = async function (podcastInput) {
    await podManager.getPodData(podcastInput)
    renderer.renderData(podManager.searchPodcast)
    $(".loader").css("display", "none")

}

const pauseCurrentlyPlaying = (fetchFrom) => {
    let playingId = JSON.parse(localStorage.getItem('playingPodcastId'))
    if (playingId) {
        let pod = podManager.getCorrectPod(playingId) || podManager.getCorrectSavedPod(playingId) || podManager.getCorrectListendPod(playingId) || discoveryManager.getCorrectDiscovery(playingId)
        pod.audioManager.audio.pause()
    }

    // if(fetchFrom === "search") {
    //     if (playingId) {
    //         let pod = podManager.getCorrectPod(playingId)
    //         console.log(pod)
    //         pod.audioManager.audio.pause()
    //     }
    // } else if(fetchFrom === "save") {
    //     if (playingId) {
    //         let pod = podManager.getCorrectSavedPod(playingId)
    //         pod.audioManager.audio.pause()
    //     }
    // } else if(fetchFrom === "played") {
    //     if (playingId) {
    //         let pod = podManager.getCorrectListendPod(playingId)
    //         pod.audioManager.audio.pause()
    //     }
    // } else if(fetchFrom === "carousel") {
    //     if (playingId) {
    //         let pod = podManager.getCorrectDiscovery(playingId)
    //         pod.audioManager.audio.pause()
    //     }
    // }
}

const resetCurrentlyPlaying = () => localStorage.removeItem('playingPodcastId')

$(".search").on("click", async function () {
    $(".loader").css("display", "block")
    handleSearch($(".userInput").val())
    $(".userInput").val("")
})








$("body").on("click", ".player-play ", async function () {
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let episodeName = $(this).closest(".podcast").find(".episodeName").text()
    let podName =  $(this).closest(".podcast").find(".episodeName").attr("name-id")


    console.log(podName)
    pauseCurrentlyPlaying("search")
    localStorage.setItem('playingPodcastId', JSON.stringify(id))

    podManager.savedPlayedPod(id)
    renderer.renderListened(podManager.listenedPodcast)
    let pod = podManager.getCorrectPod(id)
    pod.audioManager.audio.play()
    $(this).closest(".card").addClass("bounce-top")
    $(".current").empty().append(`Now Playing ${episodeName} By ${podName}`)
})




$("body").on("click", ".player-pause", function () {
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectPod(id)
    pod.audioManager.audio.pause()
    resetCurrentlyPlaying()
})

$("body").on("click", ".player-stop", function () {
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectPod(id)
    pod.audioManager.audio.pause()
    pod.audioManager.audio.currentTime = 0;
    $(".current").empty()
    resetCurrentlyPlaying()
})

$("body").on("click", ".fa-forward", function () {
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectPod(id)
    pod.audioManager.audio.currentTime += 30
})

$("body").on("click", ".fa-backward", function () {
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectPod(id)
    pod.audioManager.audio.currentTime -= 30
})

//same function - savedPodcasts
$("body").on("click", ".save-play", function () {
    let id = $(this).closest(".row").find(".podcast").find(".episodeName").attr("id")
    let episodeName = $(this).closest(".podcast").find(".episodeName").text()
    let podName =  $(this).closest(".podcast").find(".episodeName").attr("name-id")
    console.log(episodeName, podName)

    pauseCurrentlyPlaying("save")
    localStorage.setItem('playingPodcastId', JSON.stringify(id))

    let pod = podManager.getCorrectSavedPod(id)
    pod.audioManager.audio.play()
})

$("body").on("click", ".save-pause", async function () {
    let id = $(this).closest(".row").find(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectSavedPod(id)
    pod.audioManager.audio.pause()
    resetCurrentlyPlaying()
})

$("body").on("click", ".save-stop", async function () {
    let id = $(this).closest(".row").find(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectSavedPod(id)
    pod.audioManager.audio.pause()
    pod.audioManager.audio.currentTime = 0
    resetCurrentlyPlaying()
})

//same functions -- carusela

$("body").on("click", ".time", function () {
    let time = $(this).data().id
    discoveryManager.time = time

    renderer.renderLang(discoveryManager._langArray)
    $(".time").closest("#discovery-time-container").fadeOut()

})

$("body").on("click", ".carusela-play ", async function () {
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")

    pauseCurrentlyPlaying("carousel")
    localStorage.setItem('playingPodcastId', JSON.stringify(id))

    let pod = discoveryManager.getCorrectDiscovery(id)
    pod.audioManager.audio.play()
})



$("body").on("click", ".carusela-stop", function () {

    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let pod = discoveryManager.getCorrectDiscovery(id)
    pod.audioManager.audio.pause()
    pod.audioManager.audio.currentTime = 0
    resetCurrentlyPlaying()

})


////same functions -- played
$("body").on("click", ".played-play ", async function () {
    let id = $(this).closest(".row").find(".podcast").find(".episodeName").attr("id")

    pauseCurrentlyPlaying("played")
    localStorage.setItem('playingPodcastId', JSON.stringify(id))

    let pod = podManager.getCorrectListendPod(id)
    pod.audioManager.audio.play()
})

$("body").on("click", ".genres", async function () {
    let genre = $(this).attr("data-name")
    let genreID = $(this).attr("data-id")
    discoveryManager.genre = genre
    discoveryManager.genreId = genreID
    $(this).closest(".genres-container").fadeOut()
    $(".loader").css("display", "block")
    await discoveryManager.discoverPodcasts()
    $(".loader").css("display", "none")
    await discoveryManager.discoverPodcasts()
    renderer.renderDiscovered(discoveryManager.discoveredPodcasts)
    $('.carousel').carousel()

})


$("body").on("click", ".played-pause", async function () {
    let id = $(this).closest(".row").find(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectListendPod(id)
    pod.audioManager.audio.pause()
    resetCurrentlyPlaying()
})

$("body").on("click", ".played-stop", function () {
    let id = $(this).closest(".row").find(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectListendPod(id)
    pod.audioManager.audio.pause()
    pod.audioManager.audio.currentTime = 0
    resetCurrentlyPlaying()
})


$("body").on("click", ".save", function () {
    let podId = $(this).closest(".podcast").find(".episodeName").attr("id")
    podManager.savePod(podId)
    renderer.renderSaved(podManager.savedPodcast)
    M.toast({
        html: 'Added to favorites!'
    })
})

$("body").on("click", ".remove", function () {
    let podId = $(this).closest(".podcast").find(".episodeName").attr("id")
    podManager.deletePod(podId)
})


$("body").on("click", ".language", function () {
    let lang = $(this).data().id
    discoveryManager.lang = lang
    renderer.renderGenres(discoveryManager._genreIdAndName)
    $(this).closest(".flags-container").fadeOut()
})

$("body").on("click", ".genres", async function () {
    let genre = $(this).attr("data-name")
    let genreID = $(this).attr("data-id")
    discoveryManager.genre = genre
    discoveryManager.genreId = genreID

    $(".loader").css("display", "block")
    await discoveryManager.discoverPodcasts()
    $(".loader").css("display", "none")
    $(this).closest(".genres-container").fadeOut()
    await discoveryManager.discoverPodcasts()
    renderer.renderDiscovered(discoveryManager.discoveredPodcasts)
    $('.carousel').carousel()


})

$(document).keypress(function (e) {
    var key = e.which
    if (key === 13) {
        handleSearch($(".userInput").val())
        $(".userInput").val("")
    }
})

const loadPage = async function () {
    resetCurrentlyPlaying()
    await podManager.getDataFromDB()
    renderer.renderSaved(podManager.savedPodcast)
    renderer.renderListened(podManager.listenedPodcast)
}

loadPage()
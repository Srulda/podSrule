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
    $(".progress").css("display", "none")
    renderer.renderData(podManager.searchPodcast)


}

const pauseCurrentlyPlaying = () => {
    let playingId = JSON.parse(localStorage.getItem('playingPodcastId'))
    if (playingId) {
        let pod = podManager.getCorrectPod(playingId) || podManager.getCorrectSavedPod(playingId) || podManager.getCorrectListendPod(playingId) || discoveryManager.getCorrectDiscovery(playingId)
        pod.audioManager.audio.pause()
    }
}

const resetCurrentlyPlaying = () => localStorage.removeItem('playingPodcastId')

$(".search").on("click", async function () {
    handleSearch($(".userInput").val())
    $(".userInput").val("")
})








$("body").on("click", ".player-play ", async function () {
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    pauseCurrentlyPlaying()
    let episodeName = $(this).closest(".podcast").find(".episodeName").text()
    let podName = $(this).closest(".podcast").find(".episodeName").attr("name-id")



    localStorage.setItem('playingPodcastId', JSON.stringify(id))
    podManager.savedPlayedPod(id)
    renderer.renderListened(podManager.listenedPodcast)
    let pod = podManager.getCorrectPod(id)
    pod.audioManager.audio.play()
    $(this).closest(".card").addClass("bounce-top")
    $(".current").empty().append(`<i class="fas fa-headphones"></i>Now Playing ${episodeName} By ${podName}<i class="fas fa-headphones"></i>`)
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
    let episodeName = $(this).closest(".row").find(".podcast").find(".episodeName").text()
    let podName = $(this).closest(".row").find(".podcast").find(".episodeName").attr("name-id")
    console.log(episodeName, podName)

    podManager.savedPlayedPod(id)
    renderer.renderListened(podManager.listenedPodcast)
    pauseCurrentlyPlaying()
    localStorage.setItem('playingPodcastId', JSON.stringify(id))
    let pod = podManager.getCorrectSavedPod(id)
    pod.audioManager.audio.play()
    $(".current").empty().append(`<i class="fas fa-headphones"></i>Now Playing ${episodeName} By ${podName}<i class="fas fa-headphones"></i>`)

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
    $(".current").empty()
})

//same functions -- carusela

$("body").on("click", ".time", function () {
    let time = $(this).data().id
    discoveryManager.time = time
    console.log("try to bring lang-cont")
    console.log(discoveryManager._langArray)
    renderer.renderLang(discoveryManager._langArray)
    $(".time").closest("#discovery-time-container").fadeOut()

})

$("body").on("click", ".carusela-play ", async function () {

    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let episodeName = $(this).closest(".podcast").find(".episodeName").attr("episode-id")
    let podName = $(this).closest(".podcast").find(".episodeName").attr("name-id")
    pauseCurrentlyPlaying()


    localStorage.setItem('playingPodcastId', JSON.stringify(id))

    let pod = discoveryManager.getCorrectDiscovery(id)
    pod.audioManager.audio.play()
    $(".current").empty().append(`<i class="fas fa-headphones"></i>Now Playing ${episodeName} By ${podName}<i class="fas fa-headphones"></i>`)

})



$("body").on("click", ".carusela-stop", function () {

    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let pod = discoveryManager.getCorrectDiscovery(id)
    pod.audioManager.audio.pause()
    pod.audioManager.audio.currentTime = 0
    resetCurrentlyPlaying()
    $(".current").empty()
})


////same functions -- played
$("body").on("click", ".played-play ", async function () {
    let id = $(this).closest(".row").find(".podcast").find(".episodeName").attr("id")
    let episodeName = $(this).closest(".row").find(".podcast").find(".episodeName").text()
    let podName = $(this).closest(".row").find(".podcast").find(".episodeName").attr("name-id")


    pauseCurrentlyPlaying()
    localStorage.setItem('playingPodcastId', JSON.stringify(id))

    let pod = podManager.getCorrectListendPod(id)
    pod.audioManager.audio.play()
    $(".current").empty().append(`<i class="fas fa-headphones"></i>Now Playing ${episodeName} By ${podName}<i class="fas fa-headphones"></i>`)

})

$("body").on("click", ".genres", async function () {
    let genre = $(this).attr("data-name")
    let genreID = $(this).attr("data-id")
    discoveryManager.genre = genre
    discoveryManager.genreId = genreID
    $(this).closest(".genres-container").fadeOut()
    $(".progress").css("display", "block")
    await discoveryManager.discoverPodcasts()
    $(".progress").css("display", "none")
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
    $(".current").empty()

})


$("body").on("click", ".save", function () {
    let podId = $(this).closest(".podcast").find(".episodeName").attr("id")
    podManager.savePod(podId)
    renderer.renderSaved(podManager.savedPodcast)
    M.toast({
        html: 'Added to favorites!'
    })
})


$("body").on("click", ".remove-listened", async function () {
    let podId = $(this).closest('.card-action').siblings(".podcast").find(".episodeName").attr("id")

    await podManager.deletePod(podId, "listened")
    renderer.renderListened(podManager.listenedPodcast)
})

$("body").on("click", ".remove-saved", async function () {
    let podId = $(this).closest('.card-action').siblings(".podcast").find(".episodeName").attr("id")

    await podManager.deletePod(podId, "saved")
    renderer.renderSaved(podManager.savedPodcast)

})

$("body").on("click", ".save-carousel", async function () {
    let podId = $(this).closest(".carousel").find(".episodeName").attr("id")
    console.log(podId)
    await podManager.savePod(podId)
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

    await discoveryManager.discoverPodcasts()
    $(this).closest(".genres-container").fadeOut()
    await discoveryManager.discoverPodcasts()
    renderer.renderDiscovered(discoveryManager.discoveredPodcasts)
    $('.carousel').carousel()


})

$(document).keypress(function (e) {
    var key = e.which
    if (key === 13) {
        $(".progress").css("display", "block")
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

$("body").on("click", ".start-over", function () {
    // console.log("tryAgain")
    // // $(".time").closest("#discovery-time-container").fadeIn()
    // $(".time").closest("#discovery-time-container").fadeIn()

    // $(".carousel-container").fadeOut()
    location.reload();
})
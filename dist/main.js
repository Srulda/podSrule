const podManager = new PodManager()
const audioManager = new AudioManager()
const renderer = new Renderer()
const discoveryManager = new DiscoveryManager()

$(document).ready(function () {
    $('.tabs').tabs()
})


const handleSearch = async function (podcastInput) {
    await podManager.getPodData(podcastInput)
    renderer.renderData(podManager.searchPodcast)
}

$(".search").on("click", async function () {
    handleSearch($(".userInput").val())
    $(".userInput").val("")
})


$("body").on("click", ".fa-play", async function () {
    let mp3 = $(this).closest(".podcast").find(".episodeName").attr("data-id")
    console.log(mp3)
    console.log(audioManager.src)
    if (!audioManager.src) {
        audioManager.changePodcast(mp3)
        audioManager.addSource(mp3)
        audioManager.playPodcast()
    } else {
        audioManager.playPodcast()
        console.log("im here")
        console.log(audioManager.src)

    }

})

$("body").on("click", ".fa-pause", function () {
    let mp3 = $(this).closest(".podcast").find(".episodeName").attr("data-id")
    audioManager.pausePodcast()


})

$("body").on("click", ".fa-stop", function () {

    let mp3 = $(this).closest(".podcast").find(".episodeName").attr("data-id")
    audioManager.stopPodcast()
})

$("body").on("click", ".fa-forward", function () {
    audioManager.plus()
})

$("body").on("click", ".fa-backward", function () {
    audioManager.minus()
})

$("body").on("click", ".save", function () {
    let podId = $(this).closest(".podcast").find(".episodeName").attr("id")
    podManager.savePod(podId)
    renderer.renderSaved(podManager.savedPodcast)
})

$("body").on("click", ".remove", function () {
    let podId = $(this).closest(".podcast").find(".episodeName").attr("id")
    podManager.deletePod(podId)
})




$("body").on("click", ".time", function () {
    let time = $(this).data().id
    console.log(time)
    discoveryManager.time = time
    console.log(discoveryManager._time)
    renderer.renderLang(discoveryManager._langArray)
})

$("body").on("click", ".language", function () {
    let lang = $(this).data().id
    discoveryManager.lang = lang
    renderer.renderGenres(discoveryManager._genreIdAndName)
})

$("body").on("click", ".genre", async function () {
    let genre = $(this).attr("data-name")
    let genreID = $(this).attr("data-id")
    discoveryManager.genre = genre
    discoveryManager.genreId = genreID

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
    await podManager.getDataFromDB()
    renderer.renderSaved(podManager.savedPodcast)
}

loadPage()
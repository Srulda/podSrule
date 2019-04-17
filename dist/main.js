const podManager = new PodManager()
const audioManager = new AudioManager()
const renderer = new Renderer()
const discoveryManager = new DiscoveryManager()

$(document).ready(function () {
    $('.tabs').tabs()
    $('.sidenav').sidenav({edge: 'right'})
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
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectPod(id)    
    pod.audioManager.audio.play()

    

    $(this).closest(".card").addClass("bounce-top")
})

$("body").on("click", ".fa-pause", function () {
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectPod(id)
    pod.audioManager.audio.pause()


})

$("body").on("click", ".fa-stop", function () {
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectPod(id)
    pod.audioManager.audio.pause()
    pod.audioManager.audio.currentTime = 0;

})

$("body").on("click", ".fa-forward", function () {
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectPod(id)
    pod.audioManager.audio.currentTime +=30
})

$("body").on("click", ".fa-backward", function () {
    let id = $(this).closest(".podcast").find(".episodeName").attr("id")
    let pod = podManager.getCorrectPod(id)
    pod.audioManager.audio.currentTime -=30
})

$("body").on("click", ".save", function () {
    let podId = $(this).closest(".podcast").find(".episodeName").attr("id")
    podManager.savePod(podId)
    renderer.renderSaved(podManager.savedPodcast)
    M.toast({html: 'Added to favorites!'})
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
    $(".time").closest("#discovery-time-container").fadeOut()

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
    await podManager.getDataFromDB()
    renderer.renderSaved(podManager.savedPodcast)
}

loadPage()
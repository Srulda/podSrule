const podManager = new PodManager()
const audioManager = new AudioManager()
const renderer = new Renderer()

$(".search").on("click", async function () {
    let input = $(".userInput").val()
    await podManager.getPodData(input)

    renderer.renderData(podManager.searchPodcast)
    console.log(podManager.searchPodcast)
})

$("body").on("click", ".fa-play", function () {
    let mp3 = $(this).closest(".podcast").find(".episodeName").attr("data-id")
    console.log(mp3)
    audioManager.changePodcast(mp3)
    audioManager.playPodcast()
})

$("body").on("click", ".fa-pause", function () {
    let mp3 = $(this).closest(".podcast").find(".episodeName").attr("data-id")
    console.log(mp3)
    audioManager.pausePodcast()

})
const podManager = new PodManager()
const audioManager = new AudioManager()
// const audioManager = new AudioManager()
const renderer = new Renderer()


// podManager.getPodData(podManager.podName)

$(".search").on("click", function(){
    let input = $(".search").val()
    podManager.getPodData(input)
    renderer.renderData(podManager.searchPodcast)
})

$("body").on("click", ".fa-play", function(){
    let mp3 = $(this).closest(".podcast").find(".episodeName").attr("data-id")
    console.log(mp3)
    audioManager.changePodcast(mp3)
    audioManager.playPodcast()
})

$("body").on("click", ".fa-pause", function(){
    let mp3 = $(this).closest(".podcast").find(".episodeName").attr("data-id")
    console.log(mp3)
    audioManager.playPodcast()

})
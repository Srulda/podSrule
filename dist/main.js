const podManager = new PodManager()
const audioManager = new AudioManager()
const renderer = new Renderer()

podManager.getPodData(podManager.podName)


$(".search").on("click", function(){
renderer.renderData(podManager.searchPodcast)
})

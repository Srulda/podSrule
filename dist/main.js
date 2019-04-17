const podManager = new PodManager()
const audioManager = new AudioManager()
const renderer = new Renderer()

$(".search").on("click",async function(){
    let input = $(".userInput").val()
   await podManager.getPodData(input)
    renderer.renderData(podManager.searchPodcast)
})


$("body").on("click", ".fa-play",async function(){
    let mp3 =  $(this).closest(".podcast").find(".episodeName").attr("data-id")
    console.log(mp3)
    console.log(audioManager.src)
    if(!audioManager.src){
        audioManager.changePodcast(mp3)
        audioManager.addSource(mp3)
        audioManager.playPodcast()
      }
      else{
        audioManager.playPodcast()
        console.log("im here")
        console.log(audioManager.src)

      }

})

 $("body").on("click", ".fa-pause", function(){
     let mp3 = $(this).closest(".podcast").find(".episodeName").attr("data-id")
     audioManager.pausePodcast()


 })

 $("body").on("click", ".fa-stop", function(){

    let mp3 = $(this).closest(".podcast").find(".episodeName").attr("data-id")
    audioManager.stopPodcast()
})

$("body").on("click", ".fa-forward", function(){
    audioManager.plus()
})

$("body").on("click", ".fa-backward", function(){
    audioManager.minus()
})

$("body").on("click", ".save", function(){
let podId = $(this).closest(".podcast").find(".episodeName").attr("id")
podManager.savePod(podId)
renderer.renderSaved(podManager.savedPodcast)
})
    
$("body").on("click", ".remove", function(){
    let podId = $(this).closest(".podcast").find(".episodeName").attr("id")
    podManager.deletePod(podId)
    })

$("body").on("click", ".plus", function(){
    
})




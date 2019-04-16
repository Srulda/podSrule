const podManager = new PodManager()
const audioManager = new AudioManager()
const renderer = new Renderer()

$(".search").on("click",async function(){
    let input = $(".userInput").val()
   await podManager.getPodData(input)
    renderer.renderData(podManager.searchPodcast)
    console.log(podManager.searchPodcast)
})

$("body").on("click", ".fa-play",async function(){
    

    let mp3 =  $(this).closest(".podcast").find(".episodeName").attr("data-id")
    

      if(!audioManager.src){
        audioManager.changePodcast(mp3)
        audioManager.addSource(mp3)
        audioManager.playPodcast()
      }else{
        audioManager.playPodcast()
      }


})

 $("body").on("click", ".fa-pause", function(){
     let mp3 = $(this).closest(".podcast").find(".episodeName").attr("data-id")
     console.log(mp3)
     audioManager.pausePodcast()
     console.log(audioManager.src)


 })

 $("body").on("click", ".fa-stop", function(){
    let mp3 = $(this).closest(".podcast").find(".episodeName").attr("data-id")
    console.log(mp3)
    audioManager.stopPodcast()
})


$("body").on("click", ".save", function(){
let podId = $(this).closest(".podcast").find(".episodeName").attr("id")
podManager.savePod(podId)
})
    
$("body").on("click", ".remove", function(){
    let podId = $(this).closest(".podcast").find(".episodeName").attr("id")
    podManager.deletePod(podId)
    })


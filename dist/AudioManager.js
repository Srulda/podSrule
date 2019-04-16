class AudioManager {
    constructor(link) {
        
      
        this.audio = new Audio(link)
    }
    playPodcast() {
        this.audio.play()
      
    }
    pausePodcast() {
       this.audio.pause()
       }
    stopPodcast() {
        this.audio.stop()
    }

    changePodcast(mp3Link){
        this.audio =new Audio(mp3Link)
    }
        
    }

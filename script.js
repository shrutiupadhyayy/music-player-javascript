const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

//for song titles
const songs = ['Moonlight', 'Neptune', 'Pasoori', 'Toxic' , 'Forever']

//* keeping track of the song
let songIndex = 3

//* initially loading songs info DOM
loadSong(songs[songIndex])

//* *for updating the song details
function loadSong(song) {
    title.innerText = song
    audio.src = `./music/${song}.mp3`
    cover.src = `./images/${song}.jpg`
}



//* FUNCTIONS FOR PLAY AND PAUSE SONGS, the ICONS
 function playSong() {
     musicContainer.classList.add('play')
     playBtn.querySelector('i.fas').classList.remove('fa-play')
     playBtn.querySelector('i.fas').classList.add('fa-pause')

     //the html file audio tag has its own set of methods or its own API
     audio.play()
 }
  
 function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
 }

    //* functions for PREV AND NEXT 
  
    function prevSong() {
        songIndex--; //prev means decreasing so decrement
        //if the song index is less than zero,  want it to LOOP back

        if(songIndex < 0) {
            songIndex = songs.length - 1;
        }
          loadSong(songs[songIndex]) //one less than the song we're on

          playSong();
    }

    function nextSong() {
        songIndex++; //prev means decreasing so decrement
        //if the song index is less than zero,  want it to LOOP back

        if(songIndex > songs.length-1) {
            songIndex = 0;
        }
          loadSong(songs[songIndex]); //one less than the song we're on

          playSong()
    }

    function updateProgress(e) { //e is an event object, we get iteration and current time
        //console.log(e.srcElement.duration)
        const {duration, currentTime} = e.srcElement
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
    }

    function setProgress(e) { //*for showing whats the width when you click anywhere on the progress bar
        const width = this.clientWidth 
        //where we are clicking on the X axis
        const clickX = e.offsetX
        //console.log(clickX)
        //now for complete duration
        const duration = audio.duration

        audio.currentTime = (clickX / width) * duration 
    }

//* FOR EVENT LISTENERS 
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    //The classList property is useful both to add, remove and toggle CSS classes on an element
    // contains(class) Returns true if an element has the class, otherwise false

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
});

//* changing the SONG EVENTS that is prev and next songs

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong) 
//*functions are above 

audio.addEventListener('timeupdate', updateProgress)
 //*the timeupdate event works whenever the song plays, this will be called and WRITING A FUNCTION updateprog

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong) //when song ends, should continue to the next song




















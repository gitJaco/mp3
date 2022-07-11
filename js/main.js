//Song data

const songList = [
    {
        title: "Obstacle 1",
        file: "Obstacle.mp3",
        cover: "Interpol.jpg"
    },
    {
        title: "GoToSleep",
        file: "GoToSleep.mp3",
        cover: "radiohead.jpg"
    },
    {
        title: "SourGirl",
        file: "SourGirl.mp3",
        cover: "STP.jpg" 
    }
]

//Cancion actual
let actualSong = null
// Capturar elementos del DOM para trabajar con JS
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progresContainer = document.getElementById("progress-container")
//Escuchar clikcs en el boton prev
prev.addEventListener("click", () => prevSong())
//Excuchar clicks en el boton next
next.addEventListener("click", () => nextSong())
//Excuchar clicks en el boton play
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()
    } else {
        pauseSong()
    }
})
//Cargar canciones y mostrar en el listado
function loadSongs() {
    songList.forEach((song, index) => {
        console.log(song)
        //crear li
        const li = document.createElement("li")
        //crear a
        const link = document.createElement("a")
        //Hidratar a
        link.textContent = song.title
        link.href = "#"
        //Escuchar clicks
        link.addEventListener("click", () => loadSong(index))
        //Añadir a li
        li.appendChild(link)
        //Añadir li a ul
        songs.appendChild(li)
    })
} 
//Cargar cancion seleccionada
function loadSong(songIndex) {
    if (songIndex !== actualSong) {
        changeActive(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./audio/" + songList[songIndex].file      
    playSong()    

    loadCover(songIndex)
    loadTitle(songIndex)
      
    } 
}
//Actualizar controles
function updateControls() {
    if (audio.paused) { 
       play.classList.remove("fa-pause") 
       play.classList.add("fa-play") 
    } else {
      play.classList.add("fa-pause")
      play.classList.remove("fa-play") 
    } 
}
//Reproducir cancion
function playSong() {
     audio.play()
     updateControls()
}
//Pausar cancion
function pauseSong() {
     audio.pause()
     updateControls()
}
//Cambiar clase activa
function changeActive(lastIndex, newIndex) {
  const links = document.querySelectorAll("a")
  if (lastIndex !== null) {
   links[lastIndex].classList.remove("active")
  }
  links[newIndex].classList.add("active")
} 

//Cambiar imagen de cover
function loadCover(coverIndex) {
    cover.src = "./img/" + songList[coverIndex].cover    
}
//Cambiar el titulo de la cancion
function loadTitle(titleIndex) {
title.innerText = songList[titleIndex].title 

}
//Anterior cancion
function prevSong() {
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else {
        loadSong(2)
    }
    
}
//Siguiente cancion
function nextSong() {
    if (actualSong < songList.length -1) {
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    }
    
}
//Actualizar barra de progreso de la cancion
function updateProgress(event) {
     //Total y el actual
     const {duration, currentTime} = event.srcElement
     const percent = (currentTime / duration) * 100
     progress.style.width = percent + "%"
}
//Escuchar el elemento audio
audio.addEventListener("timeupdate", updateProgress)
//Hacer la barra de progreso clicable
function setProgress(event) {
const totalWidth = this.offsetWidth
const progressWidth = event.offsetX
const current = (progressWidth / totalWidth) * audio.duration
audio.currentTime = current
}
//Escuchar click en barra
progresContainer.addEventListener("click", setProgress)
//Lanzar siguiente cancion cuando se acaba la actual
audio.addEventListener("ended", () => nextSong())
//GO
loadSongs()


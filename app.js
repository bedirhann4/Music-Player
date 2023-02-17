const container = document.querySelector(".container");
const image = document.getElementById("music-image");
const sound = document.getElementById("audio");
const title = document.querySelector(".title");
const singer = document.querySelector(".singer");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration-time");
const progressBar = document.getElementById("progress-bar");
const repeat = document.getElementById("repeat");
const volumeIcon = document.getElementById("volume-icon");
const volumeBar = document.getElementById("volume");
const sidebar = document.querySelector(".side-bar");
const menu = document.querySelector(".menu");
let currentSound = 30 / 100;
sound.volume = currentSound;
const player = new MusicPlayer(musicList);
window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    volumeBar.value = 30;
});
const displayMusic = (music) => {
    title.innerHTML = music.getName();
    image.src = "img/" + music.img;
    sound.src = "mp3/" + music.file;
};
play.addEventListener("click", () => {
    // sound.play();
    // while (play.classList.length > 0) { //while içindeki sorgu false dönene kadar while döngüsü çalışır
    //     play.classList.remove(play.classList.item(0));
    // }
    if(play.classList.value.includes("play")){
        playmusic();
    }else{
        pauseMusic();
    }
    // play.classList.add("fa-solid fa-pause");
});
prev.addEventListener("click", () => {
    player.previusMusic();
    let music = player.getMusic();
    displayMusic(music);
    playmusic();
});
next.addEventListener("click", () => {
    player.nextMusic();
    let music = player.getMusic();
    displayMusic(music);
    playmusic();
});
repeat.addEventListener("click", () => {
    let music = player.getMusic();
    displayMusic(music);
    sound.load();
    playmusic();
});
sound.addEventListener("ended", () => {
    player.nextMusic();
    let music = player.getMusic();
    displayMusic(music);
    playmusic();
});
progressBar.addEventListener("input", () => {
    sound.currentTime = progressBar.value;
});
progressBar.addEventListener("mousedown", () => {
    sound.muted = true;
});
progressBar.addEventListener("mouseup", () => {
    sound.muted = false;
});
volumeIcon.addEventListener("click", () => {
    if(volumeIcon.classList.value.includes("high") || volumeIcon.classList.value.includes("low")){
        soundOff();
    }else{
        soundOn();
        if(currentSound == 0){
            volumeIcon.classList = "fa-solid fa-volume-xmark";
        }else if(currentSound <= 49){
            volumeIcon.classList = "fa-solid fa-volume-low";
        }else if(currentSound >= 50){
            volumeIcon.classList = "fa-solid fa-volume-high";
        };
    };
});
volumeBar.addEventListener("input", (e) => {
    currentSound = e.target.value;
    sound.volume = currentSound / 100;
    if(currentSound == 0){
        volumeIcon.classList = "fa-solid fa-volume-xmark";
    }else if(currentSound <= 49){
        volumeIcon.classList = "fa-solid fa-volume-low";
    }else if(currentSound >= 50){
        volumeIcon.classList = "fa-solid fa-volume-high";
    }
    if(volumeIcon.classList.value.includes("xmark")){
        sound.muted = false;
    }
});
volumeBar.addEventListener("mousedown", () => {
    if(!volumeBar.classList.value.includes("xmark")){
        sound.muted = false;
    }
});
const playmusic = () => {
    play.classList.value = "";
    play.classList.add("fa-solid");
    play.classList.add("fa-pause");
    sound.play();
    sound.muted = true;
    setTimeout(() => {
      sound.muted = false  
    },100)
};
document.addEventListener("keypress", (e) => {
    if(e.code === "Space" || e.code === "Enter"){
        if(play.classList.value.includes("play")){
            playmusic();
        }else{
            pauseMusic();
        };
    };
    console.log(e);
});
const soundOn = () => {
    volumeIcon.classList.value = "";
    volumeIcon.classList.add("fa-solid");
    volumeIcon.classList.add("fa-volume-high");
    sound.muted = false;
    volumeBar.value = currentSound;
};
const soundOff = () => {
    volumeIcon.classList.value = "";
    volumeIcon.classList.add("fa-solid");
    volumeIcon.classList.add("fa-volume-xmark");
    sound.muted = true;
    volumeBar.value = 0;

};
const pauseMusic = () => {
    play.classList.value = "";
    play.classList.add("fa-solid");
    play.classList.add("fa-play");
    sound.pause();
};
const calculateTime = (totalsecond) => {
    let minute = Math.floor(totalsecond / 60);
    let second = Math.floor(totalsecond % 60);
    if(second < 10){
        return minute + ":0" + second;
    }else{
        return minute + ":" + second
    };
};
sound.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(sound.duration);
    progressBar.max = Math.floor(sound.duration);
});
sound.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(sound.currentTime);
    currentTime.textContent = calculateTime(progressBar.value); 
});
$(document).ready(function(){
    //jquery for expand and collapse the sidebar
    $('.menu-btn').click(function(){
        if(sidebar.classList.value.includes("active")){
            $('.side-bar').removeClass('active');
            $('.menu-btn').css("visibility", "visible");
        }else{
            $('.side-bar').addClass('active');
        }
    });
    $('.close-btn').click(function(){
        $('.side-bar').removeClass('active');
        $('.menu-btn').css("visibility", "visible");
    });
});
let html;
const displayMusicList = (musicList) => {
    for(let i=0; i < musicList.length; i++){
        html = `
            <div data-id="${i}" onclick="selected(this)" class="item">
                <div class="name"><i class="fa-solid fa-music"></i> ${musicList[i].title} - ${musicList[i].singer}</div>
                <div id="music-${i}" class="long"></div>
                <audio class="music-${i}" src="mp3/${musicList[i].file}"></audio>
            </div>
            <hr>
        `;
        menu.insertAdjacentHTML("beforeend", html);
        let long = document.getElementById(`music-${i}`);
        let datafile = document.querySelector(`.music-${i}`);
        datafile.addEventListener("loadeddata", () => {
            long.innerHTML = calculateTime(datafile.duration);
        });
    };
};
const selected = (element) => {
    player.index = element.getAttribute("data-id");
    displayMusic(player.getMusic());
    playmusic();
};
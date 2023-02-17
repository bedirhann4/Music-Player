class Music{
    constructor(title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }
    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Stranger Things Theme Sound", "C418", "Stranger-Things.jpg", "StrangerT.mp3"),
    new Music("Vesaire", "Boral Kibil", "boral-kibil.jpg", "Vesaire.mp3"),
    new Music("Hotel California", "Eagles", "golden-gate.jpg", "HotelCalifornia.mp3"),
    new Music("Antartica", "Andrew Applepie", "antartica.jpg", "Antarctica.mp3"),
    new Music("Midnight City", "M83", "midnightCity.jpg", "midnightCity.mp3"),
    new Music("Outro", "M83", "midnightCity.jpg", "Outro.mp3"),
]

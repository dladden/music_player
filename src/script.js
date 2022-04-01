/* targeting the ids in HTMl and the 'audio' for the audio portion
Resources:

Audio:
https://www.w3schools.com/tags/ref_av_dom.asp

Destructuring:
https://www.w3docs.com/learn-javascript/destructuring-assignment.html

Event:
https://www.w3schools.com/js/js_this.asp

*/

const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress');

const currentTimeE = document.getElementById('current-time');
const durationE = document.getElementById('duration');






//boolean for state when page loaded nothing is playing
let isPlaying = false;


/* creating an array to store the files for pictures and tittles
*/
const songs =[
    
    {name:'Run Program Sentionauts', displayName: 'Run Program Sentionauts', artist: 'DL' },
    {name:'The Interceptor', displayName: 'The Interceptor', artist: 'DL' },
    {name:'Distance', displayName: 'Distance', artist: 'DL' },
    {name:'Edge of the Universe', displayName: 'Edge of the Universe', artist: 'DL' },
    {name:'The End', displayName: 'The End', artist: 'DL' },
    {name:'Goodbye', displayName: 'Goodbye', artist: 'DL' }




];//end array


//play Function
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')//replacing the button with fa-pause when 
    playBtn.setAttribute('title', 'Pause');//changing the hovering title

    music.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    music.pause();
    }

//ternary event listener PLay or Pause to trigger the oposite 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))




//updating the data for next song
function loadSong(song){
    //using ${} string interpolation, template literals
    title.textContent = song.displayName;//getting the song name
    artist.textContent = song.artist;//getting the artist name
    music.src = `music/${song.name}.mp3`;//changing music source sp song changes
    image.src = `img/${song.name}.jpg`;//changing the song art
    
}
//Current Song
let songIndex = 0;

/*previous function for decrementing the songs array
*/
function prevSong(){
    songIndex--;
    //if statement to implement cycle instead of dead end in array
    if(songIndex < 0){
        songIndex = songs.length -1;
    }//end if
   //console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();

}

/*next Song function incrementing the songs array
*/
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
        songIndex = 0;//start at the beginning of array after last index
    }
    //console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}//end next song

//selecting first song on start up so the its not empty
loadSong(songs[songIndex]);


/*
function which will update the progress bar using event "e"
----------------------------------------------------------
To control the current-time and duration using browser 
consol log files of the srcElement. With help of concatenation.
*/
function updateProgressBar(e){

    if(isPlaying){
        //console.log(e);
        const{duration, currentTime} = e.srcElement;
        //console.log(duration, currentTime);

        //operation to get the percentae of time progress
        const progressPercent = ((currentTime / duration)*100);
        progress.style.width = `${progressPercent}%`;

        //duration calculation for a track
        const durationMinutes = Math.floor(duration / 60);//round down for minutes
        //console.log(durationMinutes);

        //modified statement
        let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10){
                    durationSeconds = `0${durationSeconds}`;
            }
        //console.log('seconds', durationSeconds);

                    if(durationSeconds){
        durationE.textContent = `${durationMinutes}:${durationSeconds}`;

                }//end if to prevent not a number error

                //
                const currentMinutes = Math.floor(currentTime / 60);//round down for minutes
                //console.log(currentMinutes);
        
                //modified statement
                let currentSeconds = Math.floor(currentTime % 60);
                    if (currentSeconds < 10){
                            currentSeconds = `0${currentSeconds}`;
                    }
                //console.log('seconds', currentSeconds);
                currentTimeE.textContent = `${currentMinutes}:${currentSeconds}`;

    }//end if playing


}//end update progress bar




/* progress bar event using srcElement (clientWidth and offsetX)
*/function setProgressBar(e){

    //console.log(e);
    const width = this.clientWidth
    //console.log(width);

    const clickBar = e.offsetX;
    //console.log(clickBar); //showing the value for X

    //destructured constant 
    const {duration}= music;
    //console.log(clickBar/width);
    //console.log((clickBar/width) * duration);

    music.currentTime = ((clickBar/width) * duration);



}//end progress click


/*The addEventListener() method of the EventTarget interface 
sets up a function that will be called whenever the specified 
event is delivered to the target
*/
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar)

//creating an event to click on the progress bar and get a MouseEvent
progressContainer.addEventListener('click', setProgressBar);

//event to play next song automatically
music.addEventListener('ended', nextSong);



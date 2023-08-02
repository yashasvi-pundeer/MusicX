const songArr = [
    {songName: "Spain", filePath: "songs/Spain.mp3", coverPath:"covers/SPAIN.jpg",time:"1:44"},
    {songName: "First Kiss", filePath: "songs/First Kiss.mp3", coverPath:"covers/First-Kiss.jpg",time:"3:39"},
    {songName: "Apna Bana Le", filePath: "songs/Apna Bana Le.mp3", coverPath:"covers/Apna-Bana-Le.jpg",time:"4:21"},
    {songName: "Dheere Dheere", filePath: "songs/Dheere Dheere.mp3", coverPath:"covers/Dheere-Dheere.jpg",time:"3:32"},
    {songName: "OnceUponTime", filePath: "songs/Once Upon A Time Vikram.mp3", coverPath:"covers/once_upon_vikram.jpg",time:"2:23"},
    {songName: "Players", filePath: "songs/Players Badshah.mp3", coverPath:"covers/Players.jpg",time:"2:51"},
    {songName: "Subhanallah", filePath: "songs/Subhanallah.mp3", coverPath:"covers/Subhanallah.jpg",time:"4:09"},
    {songName: "Vikram ", filePath: "songs/Vikram.mp3", coverPath:"covers/vikram.jpg",time:"3:30"},
    {songName: "Spain", filePath: "songs/Spain.mp3", coverPath:"covers/SPAIN.jpg",time:"1:44"},
    {songName: "First Kiss", filePath: "songs/First Kiss.mp3", coverPath:"covers/First-Kiss.jpg",time:"3:39"},
    {songName: "Apna Bana Le", filePath: "songs/Apna Bana Le.mp3", coverPath:"covers/Apna-Bana-Le.jpg",time:"4:21"},
    {songName: "Dheere Dheere", filePath: "songs/Dheere Dheere.mp3", coverPath:"covers/Dheere-Dheere.jpg",time:"3:32"},
    {songName: "OnceUponTime", filePath: "songs/Once Upon A Time Vikram.mp3", coverPath:"covers/once_upon_vikram.jpg",time:"2:23"},
    {songName: "Players", filePath: "songs/Players Badshah.mp3", coverPath:"covers/Players.jpg",time:"2:51"},
    {songName: "Subhanallah", filePath: "songs/Subhanallah.mp3", coverPath:"covers/Subhanallah.jpg",time:"4:09"},
    {songName: "Vikram ", filePath: "songs/Vikram.mp3", coverPath:"covers/vikram.jpg",time:"3:30"},
                ]

var songIndex=0;
const audioElement = new Audio(songArr[songIndex].filePath)

const masterPlay = document.getElementById("masterPlay")
const previousSong = document.getElementById("previousSong")
const nextSong = document.getElementById("nextSong")
const progressbar = document.getElementById("progressbar")
const gif = document.getElementById("gif")



//adding songs to list using js
const songItem = Array.from( document.getElementsByClassName("songitem"));  //converting html collection to array
songItem.forEach((ele,i)=>{
           //console.log(ele,i);
           ele.getElementsByTagName('img')[0].src=songArr[i].coverPath
           ele.getElementsByClassName('songName')[0].innerText=songArr[i].songName
           ele.getElementsByClassName('timestamp')[0].innerText=songArr[i].time
})

//time bar logic
const timebarUpdate= document.getElementById('timebar');
const timebar =()=>{
    let timeMin= parseInt(audioElement.duration/60)
    let timeSec = parseInt(((audioElement.duration/60)%1)*60)
    if(isNaN(timeMin) && isNaN(timeSec)){
          timeMin=0;
          timeSec=0;
    }
    // console.log(timeMin+":"+timeSec)
    const timePassed = audioElement.currentTime;
        const tpMin = parseInt(timePassed/60);
        const tpSec= parseInt(((timePassed/60)%1)*60);
        // console.log(tpMin+":"+tpSec)
    timebarUpdate.innerText= `${tpMin}:${tpSec}/${timeMin}:${timeSec}` 

}

//individual play button func
const individualPlaybutton = Array.from(document.getElementsByClassName('individualPlaybutton'));

//testing
const makePlay = ()=>{
    individualPlaybutton.forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play') 
    })
}
individualPlaybutton.forEach((ele,i)=>{
    ele.addEventListener('click',(event)=>{
        makePlay();
        songIndex= parseInt(event.target.id); //getting which number song is clicked
        if(audioElement.paused || audioElement.currentTime==0){
            audioElement.src= songArr[songIndex].filePath                //getting song path for that song
           audioElement.currentTime=0             //setting current time to 0 because new song is played
            console.log(audioElement.duration)
            audioElement.play();                          //playing the audio              
            event.target.classList.remove('fa-circle-play')
            event.target.classList.add('fa-circle-pause') 
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')               //master play button change
            gif.style.opacity=1
        }
        else{
            console.log("inside paused")
            audioElement.pause();                          //pause the audio
            audioElement.curren 
            event.target.classList.add('fa-circle-play')
            event.target.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play')
            masterPlay.classList.remove('fa-circle-pause')                           //master play button change
            gif.style.opacity=0
        }
    })

})



//mater play functionality                
masterPlay.addEventListener('click',()=>{
   if(audioElement.paused  || audioElement.currentTime==0){   //if audio is paused then play it and change icon
    audioElement.play()
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
      gif.style.opacity="1"

   }else{                                                    //if audio is playing then pause it 
      audioElement.pause() 
      masterPlay.classList.add('fa-circle-play');
      masterPlay.classList.remove('fa-circle-pause');
      gif.style.opacity=0;
    }
})



//progress bar update time
audioElement.addEventListener('timeupdate',(e)=>{
    const updateTime = parseInt((audioElement.currentTime/audioElement.duration)*100);    
    progressbar.value=updateTime;
  timebar()
})


//seek functionality in progress bar
progressbar.addEventListener('change',()=>{
    const seekTime = parseInt((progressbar.value*audioElement.duration)/100);
    audioElement.currentTime=seekTime;
    console.log(seekTime)
})

//previous song play
previousSong.addEventListener('click',()=>{
  if(songIndex<=0){
    songIndex=songArr.length-1;                           //current song index-1
  }
  else{
    songIndex=songIndex-1;
  }
  audioElement.src= songArr[songIndex].filePath 
  audioElement.currentTime=0;                         //setting current time to 0 because new song is played
  audioElement.play();                          //playing the audio
  masterPlay.classList.remove('fa-circle-play')
  masterPlay.classList.add('fa-circle-pause') 
  gif.style.opacity=1
})

//next song play
nextSong.addEventListener('click',()=>{
    if(songIndex>=songArr.length){
      songIndex=0;
      console.log(songIndex)
    }
    else{
      songIndex=songIndex+1;
      if(songIndex==songArr.length)
      songIndex=0
    }
    audioElement.src= songArr[songIndex].filePath 
    audioElement.currentTime=0;                         //setting current time to 0 because new song is played
    audioElement.play();                          //playing the audio
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    gif.style.opacity=1 
  })

  timebar()
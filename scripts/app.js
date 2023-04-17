let timehr = document.getElementById("hr");
let timeMin = document.getElementById("min");
let timeSec = document.getElementById("secs");
let progressBar = document.getElementById("progress-bar");
let timer = document.getElementsByClassName("timer");
let timerDone = document.getElementById("timeup");
let divider = document.getElementsByClassName("divider")
let hourSection = document.getElementsByClassName("hour")

let func = document.getElementById("functions");

var x = undefined
let distance = undefined

window.addEventListener("keydown", (e)=> {
  let key = e.key;
  if(key==` `){
    func.classList.toggle('fade-in')
  }
  },true);

let startCount = document.getElementById("start-btn");
let stopCount = document.getElementById("stop-btn");
let pauseResume  = document.getElementById("pause-btn");
let negativeSign = document.getElementById("neg")
negativeSign.classList.add('hidden')
var isPaused = false
let saveddistance = 0
let cntd = 0;
startCount.addEventListener("click", (e) => {
  if(e.detail!==1){
    return
  }

  if(startCount.innerHTML==='Resume'){
    // startCount.innerHTML='Start'
    pauseResume.disabled = false
  } else pauseResume.disabled=false
 

  startCount.disabled = true

  let tth = document.getElementById("tth").value;
  let ttm = document.getElementById("ttm").value;
  let tts = document.getElementById("tts").value;
  
  timer[0].style = "color:whitesmoke;";
    timer[1].style = "color:whitesmoke";
    timer[2].style = "color:whitesmoke";
    timerDone.classList.remove('fade-in')

  if (tth > 23 || ttm > 59 || tts > 59) {
    alert("Invalid Input: Hour must not be greater than 23 while minute and seconds are less than 60")
  } 
  else {
    cntd=0
    cntd = (tth*3600*1000)+(ttm*60*1000)+(tts*1000)+2000
    tth = 0; 
    ttm = 0; 
    tts = 0;
    
    distance = cntd
    let cnt = 0
// Update the count down every 1 second
  x = setInterval(function () {
  // Get today's date and time
  // var now = new Date().getTime();

  // Find the distance between now and the count down date
  
  distance -=1000
console.log(`Distance > 0: ${distance}`)
  
  if (distance < 0) {
    // clearInterval(x);
    // timehr.innerHTML = '00'
    // timeMin.innerHTML = '00'
    // timeSec.innerHTML = '00'

    //cnt  = distance>>>0
    cnt = (distance * -1)
    negativeSign.classList.remove('hidden')
    
console.log(`Distance < 0: ${cnt}`)
for(let i=0;i<4;i++){
  console.log(`i is ${i}`)
  timer[i].style="color:red"
}
    timerDone.classList.add('fade-in')
    // startCount.disabled = false
  }
   else{
    cnt = distance
    negativeSign.classList.add('hidden')
   }

  // Time calculations for days, hours, minutes and seconds
  var hours = Math.trunc((cnt % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.trunc((cnt % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.trunc((cnt % (1000 * 60)) / 1000);
   

  if(hours===0){
   hourSection[0].classList.add('hidden')
   divider[0].classList.add('hidden')
   timer[2].classList.add('font-')
   timer[3].classList.add('font-')
   divider[1].classList.add('font-')
  } else{
  timer[2].classList.remove('font-')
   timer[3].classList.remove('font-')
   divider[1].classList.remove('font-')
   hourSection[0].classList.remove('hidden')
   divider[0].classList.remove('hidden')
  }
  // Output the result in an element with id="demo"
  timehr.innerHTML = `${Math.trunc(hours / 10)}` + `${Math.trunc(hours % 10)}`;
  timeMin.innerHTML =
    `${Math.trunc(minutes / 10)}` + `${Math.trunc(minutes % 10)}`;
  timeSec.innerHTML =
    `${Math.trunc(seconds / 10)}` + `${Math.trunc(seconds % 10)}`;

  // If the count down is over, write some text
  let progress = Math.trunc((cntd - distance) / 1000);
  progress = Math.trunc((progress / cntd) * 100000);

  // console.log(progress)

  if (distance > cntd * 0.5) {
    progressBar.style = "background-color:green;";
  } else if (distance > cntd * 0.25 && distance < cntd * 0.5) {
    progressBar.style = "background-color:yellow;";
  } else if (distance > 0 && distance < cntd * 0.25) {
    progressBar.style = "background-color:red;";
  }

}, 1000);
}
});

pauseResume.addEventListener('click', (e)=>{
  if(e.detail!==1){
    return
  }
  clearInterval(x)
  document.getElementById('tth').value = Math.trunc((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.getElementById('ttm').value = Math.trunc((distance % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById('tts').value = Math.trunc((distance % (1000 * 60)) / 1000);
  startCount.innerHTML='Resume'
  startCount.disabled = false
  pauseResume.disabled=true
  // console.log(`cntd value after pause:${cntd}`)
})

stopCount.addEventListener('click',(e)=>{
  if(e.detail!==1){
    return
  }
  clearInterval(x)
  timehr.innerHTML = '00'
  timeMin.innerHTML = '00'
  timeSec.innerHTML = '00'
  document.getElementById('tth').value = ''
  document.getElementById('ttm').value = ''
  document.getElementById('tts').value = ''
  for(let i = 0;i<4;i++){
    timer[i].style='color:whitesmoke'
  }
 
  startCount.disabled = false 
  pauseResume.disabled = true
  startCount.innerHTML = 'Start'
  negativeSign.classList.add('hidden')
}) 


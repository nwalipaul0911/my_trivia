const url = 'https://the-trivia-api.com/api/questions?limit=20&difficulty=medium';
const options = document.querySelectorAll('.options')
const question = document.querySelector('#question')
const play = document.querySelector('#start')
const hidden = document.querySelectorAll('.hidden')
const welcome = document.querySelector('#welcome')
const num = document.querySelector('#number')
const countdown_ = document.querySelector('#time')
const answer_ = document.querySelector('.correct-answer')



// ==============Start trivia ===============
play.addEventListener('click', ()=>{
  play.classList.add('hide')
  welcome.classList.add('hide')
  trivia()
  hidden.forEach(item=>{
    item.classList.remove('hide')
  })
})

// ===============End trivia =================
function endTrivia(score, length){
  let end_score = Math.floor((score/length)*100)
  play.innerHTML = 'Try Again'
  play.classList.remove('hide')
  welcome.innerHTML = `Score : ${end_score}%`
  welcome.classList.remove('hide')
  hidden.forEach(item=>{
    item.classList.add('hide')
  })
}

// ======================Option mappings =======================
const options_map = (arr1, arr2)=>arr1.map((x, i)=>{arr2[i].innerHTML = `${x}`})


// ==============Trivia async function ====================
async function trivia(){
  const api = await fetch(url)
  const data = await api.json()
  let time = 180
  let score = 0
  let count = 0
  var timer = null
  startCountdown()
  num.innerHTML = `${count+1}/${data.length}`
  let question_ = data[count].question
  question.innerHTML = `${question_}`
  let correctAnswer = data[count].correctAnswer
  answer_.innerHTML = `${correctAnswer}`
  let incorrectAnswers = data[count].incorrectAnswers
  let answers = incorrectAnswers.concat(correctAnswer).sort(()=>Math.random()-.5)
  options_map(answers, options)
  options.forEach(element=>{
    element.addEventListener('click', ()=>{
      if(element.textContent==answer_.textContent){
        score++
        element.classList.add('btn')
        element.classList.replace('btn-custom', 'btn-success')
        
      }
      else{
        element.classList.add('btn')
        element.classList.replace('btn-custom', 'btn-danger')
        
        options.forEach(element=>{
          if(element.textContent==answer_.textContent){
            element.classList.add('btn')
            element.classList.replace('btn-custom', 'btn-success')
            
          }
        })
      }
      options.forEach(element=>{
        element.style.pointerEvents = 'none'
      })
      setTimeout(nextQuestion, 2000)
    })
  })
  function nextQuestion(){
    options.forEach(element=>{
      element.style.pointerEvents = 'all';
      element.classList.remove('btn')
      element.classList.replace('btn-success', 'btn-custom')
      element.classList.replace('btn-danger', 'btn-custom')
    })
    count++
    if(count<data.length){
      num.innerHTML = `${count+1}/${data.length}`
      let question_ = data[count].question
      question.innerHTML = `${question_}`
      let correctAnswer = data[count].correctAnswer
      answer_.innerHTML = `${correctAnswer}`
      let incorrectAnswers = data[count].incorrectAnswers
      let answers = incorrectAnswers.concat(correctAnswer).sort(()=>Math.random()-.5)
      options_map(answers, options)
    }
    else{
      endTrivia(score, data.length)
      resetCountdown()
      
    }
  }
  function countdown(){
    time--

    let secs = time % 60;
    let mins = Math.floor(time / 60);
    if(secs<10) secs = '0'+ secs;
    if(mins<10) mins = '0'+ mins;

    countdown_.innerHTML = `${mins}:${secs}`
    if(time==0){
      endTrivia(score, data.length)
      resetCountdown()
      
    }
  }
  function startCountdown(){
    if(timer){
      return
    }
    timer = setInterval(countdown, 1000)
  }
  
  function stopCoundown(){
    clearInterval(timer)
    timer=null
  }
  function resetCountdown(){
    stopCoundown();
    time = 180;
    countdown_.innerHTML = `00:00`
    count=0
    num.innerHTML = `${count+1}/${data.length}`
    score=0
  }
} 

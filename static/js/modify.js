const url = 'https://the-trivia-api.com/api/questions?limit=20&difficulty=medium';
const options = document.querySelectorAll('.options')
const question = document.querySelector('#question')
const play = document.querySelector('#start')
const hidden = document.querySelectorAll('.hidden')
const welcome = document.querySelector('#welcome')
const num = document.querySelector('#number')
const countdown_ = document.querySelector('#time')
const answer_ = document.querySelector('.correct-answer')
var time = 120
var score = 0
play.addEventListener('click', ()=>{
  play.classList.add('hide')
  welcome.classList.add('hide')
  trivia()
  hidden.forEach(item=>{
    item.classList.remove('hide')
  })
})
function endTrivia(score, index){
  let end_score = Math.ceil((score/index)*100)
  play.innerHTML = 'Try Again'
  play.classList.remove('hide')
  welcome.innerHTML = `Score : ${end_score}%`
  welcome.classList.remove('hide')
  hidden.forEach(item=>{
    item.classList.add('hide')
  })
}

// mappings 
const options_map = (arr1, arr2)=>arr1.map((x, i)=>{arr2[i].innerHTML = `${x}`})
async function trivia(){
  let score = 0
  let count = 0
  var timer = setInterval(countdown,1000)
  const api = await fetch(url)
  const data = await api.json()
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
        element.classList.replace('btn-outline-secondary', 'btn-success')
      }
      else{
        element.classList.replace('btn-outline-secondary', 'btn-danger')
        options.forEach(element=>{
          if(element.textContent==answer_.textContent){
            element.classList.replace('btn-outline-secondary', 'btn-success')
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
      element.style.pointerEvents = 'all'
      element.classList.replace('btn-success', 'btn-outline-secondary')
      element.classList.replace('btn-danger', 'btn-outline-secondary')
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
      stopInterval()
      
      
    }
  }
  function countdown(){
    time--
    countdown_.innerHTML = `${time}`
    if(time==0){
      endTrivia(score, data.length)
      stopInterval()
    }
  }
  
  function stopInterval(){
    clearInterval(timer)
    time=120
    count=0
  }
} 

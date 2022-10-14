const url = 'https://the-trivia-api.com/api/questions?categories=general_knowledge,music,sport_and_leisure,geography,science&limit=1&difficulty=easy'
const play = document.querySelector('#play')
const next = document.querySelector('#next')
const welcome = document.querySelector('#welcome')
const hide = document.querySelectorAll('.hide')
const options = document.querySelectorAll('.options')
const question_ = document.querySelector('#question')
const submit = document.querySelector('#submit')
const answer = document.querySelector('.answer')
const options_container = document.querySelector('.options-container')

var time = 60
var score = 0
var count = 1

play.addEventListener('click', ()=>{
  time = 61
  score = 0
  count = 1
  play.classList.add('hide')
  welcome.classList.add('hide')
  question()
  hide.forEach(element=>{
    element.classList.remove('hide');
  })
  setInterval(()=>{
    if(time==0){
      time==61
    }
    else{
      time--
      document.querySelector('#time').innerHTML = `${time}`
    }
  }, 1000)
})
options.forEach(element=>{
  element.addEventListener('click', ()=>{
    element.classList.add('pending')
    options.forEach(item=>{
      if(item.classList.contains('pending')){
        null
      }
      else{
        item.style.pointerEvents = 'none'
      }
    })
    setTimeout(()=>{
      validator(options)
    }, 1000)
    setTimeout(()=>{
      newQuestion(options)
    }, 2000)
  })
})
function validator(arg){
  arg.forEach(element=>{
    if(element.classList.contains('pending')&& element.textContent == answer.textContent){
      element.classList.remove('pending');
      element.classList.add('success')
      score++
      document.querySelector('#score').innerHTML = `${score}`
    }
    else if(element.textContent == answer.textContent){
      element.classList.add('success')
    }
  })
}
function newQuestion(arg){
  arg.forEach(element=>{
    element.classList.remove('pending', 'success');
    element.style.pointerEvents = 'all'
  })
  options_container.style.display = 'none'
  let arr = reorder()
  options_position(arr, arg)
  question()
  count++
  document.querySelector('#count').innerHTML = `${count}`
  setTimeout(()=>{
    options_container.style.display = 'flex'
  },1000)
}

// =================options mapping=================
const option_text = (arr1, arr2)=> arr1.map((a, b)=>{arr2[b].innerHTML = `${a}`}) 

const options_position = (arr1, arr2)=> arr1.map((a, b)=>{arr2[b].style.order = `${a}`})


// =================question api====================
async function question(){
  const result = await fetch(url)
  const data = await result.json()
  const quest = data[0].question
  question_.innerHTML = `${quest}`
  const incorrectAnswers = data[0].incorrectAnswers
  const correctAnswer = data[0].correctAnswer
  answer.innerHTML = `${correctAnswer}` 
  const answers = incorrectAnswers.concat(correctAnswer)
  option_text(answers, options)
}
function reorder(arr= [1,2,3,4]){
  let to = Math.round(Math.random()*arr.length-1)
  to = Math.sqrt(to*to)
  let from = Math.round(Math.random()*arr.length-1)
  from = Math.sqrt(from*from)
  const spliced = arr.splice(from,to)
  return arr.concat(spliced)
} 
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


var score = 0
var count = 1

play.addEventListener('click', ()=>{
  play.classList.add('hide')
  welcome.classList.add('hide')
  question()
  hide.forEach(element=>{
    element.classList.remove('hide');
  })
})
options.forEach(element=>{
  element.addEventListener('click', ()=>{
    element.classList.add('pending', 'selected')
    submit.style.display = 'block'
    options.forEach(element=>{
      if(element.classList.contains('selected')){
        null
      }
      else{
        element.style.pointerEvents = 'none'
      }
    })
  })
})
// ===============submit button=================
submit.addEventListener('click', ()=>{
  setTimeout(()=>{
    next.style.display = 'block'
    submit.style.display = 'none'
    options.forEach(element=>{
      if(element.classList.contains('selected') && element.textContent == answer.textContent){
        element.classList.remove('pending')
        element.classList.add('success')
        score++
        document.querySelector('#score').innerHTML = `${score}`
      }
      else if (element.classList.contains('selected') && element.textContent != answer.textContent){
        element.classList.remove('pending')
        element.classList.add('failed')
        options.forEach(element=>{
          if(element.textContent == answer.textContent){
            element.classList.add('success')
          }
        })
      }
    })
  }, 1000)
})


// ==================next button================
next.addEventListener('click', ()=>{ 
  next.style.display = 'none';
  count++
  document.querySelector('#count').innerHTML = `${count}`
  options.forEach(element=>{
    element.style.pointerEvents = 'all';
    element.classList.remove('pending', 'selected', 'success', 'failed')
  })
  
  var options_order = reorder() 
  options_position(options_order, options)
  options_container.style.display = 'none'
  setTimeout(()=>{
    question()
    options_container.style.display = 'flex'
  }, 2000)
})

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



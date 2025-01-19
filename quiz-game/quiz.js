import { questions } from './questions.js'

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
  currentQuestionIndex=0;
  score=0;
  nextButton.innerHTML = "Next";
  showQuestion();
}


function showQuestion(){
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  //updating question with its number then . and then the question from array
 
  currentQuestion.answers.forEach(answer =>{

    const button = document.createElement("button");
    button.innerHTML = answer.text; //adding each option in the button element
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}


function resetState(){

  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}




function selectAnswer(e){

  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button =>{
    //this part of code allow to chose only one option and if that opion is wrong then it also displays the right option in green
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}


nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex < questions.length){ //if more questions are there
    handleNextButton();
  }
  else{
    startQuiz();
  }
});


function showScore(){

 resetState();
 questionElement.innerHTML = `You got ${score} out of ${questions.length} correct.`;
 nextButton.innerHTML = 'Play Again';
 nextButton.style.display = "block";
}










function handleNextButton(){

  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length)
  {
    showQuestion();
  }
  else{
    showScore();
  }
}









startQuiz();


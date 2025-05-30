const questions = [
    {
    question: "Which planet is closest to the sun?",
    answers: [
        {text:"Earth",correct: false},
        {text:"Mars",correct: false},
        {text:"Venus",correct: false},
        {text:"Mercury",correct: true},
    ]
    },
    {
    question: "Which is largest animal in the world?",
    answers: [
        {text: "Shark", correct: false},
        {text: "Blue whale", correct: true},
        {text: "Elephant", correct:false},
        {text: "Giraffe", correct:false},
    ]
},{
    question: "Which is the smallest continent in the world?",
    answers: [
        {text: "Asia", correct: false},
        {text: "Arctic", correct: false},
        {text: "Australia", correct:true},
        {text: "Africa", correct:false},
    ]
},{
    question: "Which country has the highest life expectancy?",
    answers: [
        {text: "Hong Kong", correct: true},
        {text: "India",correct: false},
        {text: "Africa",correct: false},
        {text: "America",correct: false},
    ]
},
{
    question: "What is the largest ocean on Earth?",
    answers:[
        {text: "Indian Ocean",correct: false},
        {text: "Pacific Ocean",correct: true},
        {text: "Atlantic Ocean",correct: false},
        {text: "Arctic Ocean",correct: false},
    ]
},
];
const questionElement =document.getElementById("question");
const answerButton =document.getElementById("answer-buttons");
const nextButton =document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo+". "+ currentQuestion.question;
    
    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    });
}
function selectAnswer(e){
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}


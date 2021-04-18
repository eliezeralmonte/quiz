// dom traversal items//
//header//
var highScoresButtonEl = document.querySelector("#highScoresButton");
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector("#startButton");
var introEl = document.querySelector("#intro");
//question variables //
var quizQuestionContainerEl = document.querySelector("#quizQuestionContainer");
var questionEl = document.querySelector("#question");
var questionChoicesEl = document.querySelector(".questionsClass");
// var answer0El = document.querySelector ("#answer0");
// var answer1El = document.querySelector ("#answer1");
// var answer2El = document.querySelector ("#answer2");
// var answer3El = document.querySelector ("#answer3");
// var btn0El = document.querySelector ("#btn0");
// var btn1El = document.querySelector ("#btn1");
// var btn2El = document.querySelector ("#btn2");
// var btn3El = document.querySelector ("#btn3");
var progressEl = document.querySelector("#progress");
var answerResponseEl = document.querySelector("#answerResponse");

//results//
var resultsContainerEl = document.querySelector("#resultsContainer");
var highScoresContainerEl = document.querySelector("#highScoresContainer");

// global variables || questions array or object//
var userScore = 0;
var currentQuestion = 0;
var time = 0;

//questions array
var questions = [
    {   
        question: "What are the main primitive data types in Javascript?",
        answers: ["Strings, Numbers, BigInts, Boolean, Undefined, Symbol, and Null", "Ghosts, Warhogs, Tanks and Banshees", "Blue Team, Noble Team, ODST, and Spartans", "Paragraphs, Text Blocks, Equations, and Functions"], 
        correct: "String, Number, Bigint, Boolean, Undefined, Symbol, and Null"
    },
    {
        question: "??", 
        answers: ["a","b","c"], 
        correct: "b"
    }
];

// functions
//------------------------------//
function timerFunc(){
    let setTimer = setInterval(function(){
        time++;
        timerEl.innerHTML = time;
        if(time === 60) {
            clearInterval(setTimer)
        };
    }, 1000);
};

timerFunc();

// startQuiz function will hide the intro container and display the Quiz Question Container
function startQuiz() {
    // this will hide Intro container and display quiz question container
    introEl.setAttribute("style", "display: none");
    quizQuestionContainerEl.setAttribute("style", "display: block");
    // once done it will render elements within the quiz question container
    renderQuestionContainer();
};

// function to render question && answers //
function renderQuestionContainer() {
// make sure to empty our questions container before rendering 

//display current question
questionEl.innerHTML = questions[currentQuestion].question;

//display answer choices
    // make a for loop to go through the current questions answer choices
    for(let i = 0; i < questions[currentQuestion].answers.length; i++) {
        // make answerChoices variable and create button element
        let answerChoices = document.createElement("button");
        // take answerChoices variable set innerHTML to empty string
        answerChoices.innerHTML = "";
        // take answerChoices variable and add innerHTML the current loop's question text index number
        answerChoices.innerHTML = questions[currentQuestion].answers[i];
        // append the answerChoices to questionChoicesEl container
        questionChoicesEl.append(answerChoices);
        // take answerChoices variable and attach clickListeners to each button and then if clicked call a function to check if answer correct
        answerChoices.onclick = compareResponse;
    }




    
};
 
function compareResponse () {
    // compares answerChoices to 'correct' property within question object    
    if(this.innerHTML === questions[currentQuestion].correct) {
        userScore ++;
        answerResponseEl.innerHTML = `Correct!`
    } else {
        answerResponseEl.innerHTML = `False!`
    }
    console.log(userScore);
};

// event listener functions//
startButtonEl.addEventListener("click", startQuiz);
// nextQuestionButtonEl.addEventListener("click", rendernextQuestion;
// variable declaration//
//-------------------------------------------------------------------------------------------------------------------------------------//

//JSON File//
var scores = JSON.parse(localStorage.getItem("scoresLS")) || [];

//header//
var highScoresButtonEl = document.querySelector("#highScoresButton");
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector("#startButton");
var introEl = document.querySelector("#intro");

//question variables //
var quizQuestionContainerEl = document.querySelector("#quizQuestionContainer");
var questionEl = document.querySelector("#question");
var questionChoicesEl = document.querySelector(".questionsClass");
var progressEl = document.querySelector("#progress");
var answerResponseEl = document.querySelector("#answerResponse");
var nextBtnEl = document.querySelector("#nextBtn");
var correctAnswerEl = document.querySelector("#correctAnswer");

//results//
var highScoresContainerEl = document.querySelector("#highScoresContainer");
var resultsContainerEl = document.querySelector("#resultsContainer");
var userResults = document.querySelector("#userResults");
var submitLocalStorageBtn = document.querySelector("#submitLocalStorageBtn");
var userInitialsEl = document.querySelector ("#userInitials");
var submittedTextEl = document.querySelector ("#submittedText");

// global variables
var userScoreEl = 0;
var currentQuestion = 0;
var time = 15;
var localStorageArr = []; 

//questions array
var questions = [
    {   
        question: "What are the main primitive data types in Javascript?",
        answers: ["Strings, Numbers, BigInts, Boolean, Undefined, Symbol, and Null", "Ghosts, Warhogs, Tanks and Banshees", "Blue Team, Noble Team, ODST, and Spartans", "Paragraphs, Text Blocks, Equations, and Functions"], 
        correct: "Strings, Numbers, BigInts, Boolean, Undefined, Symbol, and Null"
    },
    {
        question: "Select the option that has at least one feature from Javascript ES6", 
        answers: ["Arrow Functions, Recursion, Full-Stack","In-line Styling, Function Declaration, Function Expression","c"], 
        correct: "c"
    },
    {
        question: "Which of the following forms up the Web Trifecta?", 
        answers: ["HTML, Javascript & Python","HTML, CSS & Java, HTML, CSS & Javascript","Express, Node.js & React"], 
        correct: "Express, Node.js & React"
    },
    {
        question: "Select the option that has at least one feature from Javascript ES6", 
        answers: ["Arrow Functions, Recursion, Full-Stack","In-line Styling, Function Declaration, Function Expression","c"], 
        correct: "In-line Styling, Function Declaration, Function Expression"
    }
];

var questionLengthEl = questions.length;

// functions
//------------------------------------------------------------------------------------------------------------------------------------//
function timerFunc () {
    var setTimer = setInterval( function() {
        time--;
        timerEl.innerHTML = time;
        if(time === 0) {
            displayResults();
            clearInterval(setTimer);
        };
    }, 1000);
};

// startQuiz function will hide the intro container and display the Quiz Question Container
function startQuiz () {
    //starts timer
    timerFunc();
    // this will hide Intro container and display quiz question container
    introEl.setAttribute("style", "display: none");
    quizQuestionContainerEl.setAttribute("style", "display: block");
    // once done it will render elements within the quiz question container
    renderQuestionContainer();
};

// function to render question && answers //
function renderQuestionContainer () {
//checks if question number has been reached -- 
if (currentQuestion === questions.length) {
    displayResults ();
} else { //display current question
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
            // take answerChoices variable and attach clickListener to each button and then if clicked call a function to check if answer correct
            answerChoices.onclick = compareResponse;
        };
    };
};

// this function will compare response to add or deduct points to userScore variable and will add 5 secs to time value
function compareResponse () {
    // compares answerChoices to 'correct' property within question object
    
    if( this.textContent === questions[currentQuestion].correct ) {
        userScoreEl ++;
        time += 5;
        answerResponseEl.innerHTML = `Correct!`;
        progressEl.innerHTML = `You have answered ${userScoreEl} out of ${questionLengthEl} questions correctly!`;

    } else {
        answerResponseEl.innerHTML = `False!`;
        progressEl.innerHTML = `You have answered ${userScoreEl} out of ${questionLengthEl} questions correctly!`;
    };

// displays correct response by unhiding correctResponse element
correctAnswerEl.setAttribute ("style", "display: block; font-weight: bold;");
correctAnswerEl.innerHTML = `Correct answer was: ${questions[currentQuestion].correct}`;
// renders Next button and runs function to generate next question
nextBtn.setAttribute("style","display: block;");
nextBtnEl.onclick = generateNextQuestion;
};

function generateNextQuestion () {
// clears questionChoicesEl container
currentQuestion += 1;
questionChoicesEl.innerHTML = "";
answerResponseEl.innerHTML = "";
progressEl.innerHTML = "";
correctAnswerEl.innerHTML = "";
nextBtn.setAttribute("style","display: none;");

renderQuestionContainer();
};

function displayResults () {
    quizQuestionContainer.setAttribute("style","display: none;");
    resultsContainerEl.setAttribute("style", "display: block");
    
    userResults.innerHTML = `You answered ${userScoreEl} out of ${questionLengthEl} questions correctly.`
};

function renderHighScores () {
    introEl.setAttribute("style","display: none;");
    resultsContainerEl.setAttribute("style","display: none;");
    quizQuestionContainerEl.setAttribute("style","display: none;");
    highScoresContainerEl.setAttribute("style","display: block;");
};

function addScoretoLS (e) {
    //prevent default behavior
    e.preventDefault();
    // parsing JSON file in order to access it and store it variable
    localStorageArr = scores; 
    // displays message to user
    submittedTextEl.setAttribute("style", "display: block");
// create new object from userInput and push into localStorageArr
    var newScore = {
    score: userScoreEl,
    initials: userInitialsEl.value
    };

    localStorageArr.push(newScore);
    //set localStorage Array as local storage element
    localStorage.setItem ("scoresLS", JSON.stringify(localStorageArr));

    
};

// event listener functions//
highScoresButtonEl.addEventListener ("click", renderHighScores);
startButtonEl.addEventListener("click", startQuiz);
submitLocalStorageBtn.addEventListener ("click", addScoretoLS);
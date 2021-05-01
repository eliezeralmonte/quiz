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
var scoresListEl = document.querySelector ("#scoresList");
var gameResetBtn = document.querySelector ("#gameResetBtn");
var enterInitialsText = document.querySelector ("#enterInitialsText");

// global variables
var userScoreEl = 0;
var currentQuestion = 0;
var time = 15;
var localStorageArr = []; 

//questions array
var questions = [
    {   
        question: "Which are primitive datatypes in Javascript?",
        answers: ["Ghosts, Warhogs and Tanks", "Strings, Numbers, BigInts, Boolean", "Blue Team, ODST, and Spartans", "Paragraphs, Equations, and Functions"], 
        correct: "Strings, Numbers, BigInts, Boolean"
    },
    {
        question: "Select the option that has at least one feature from Javascript ES6",
        answers: ["In-line Styling, Function Declaration, Function Expression","Cortona, 343 Guilty Spark", "Arrow Functions, Recursion, Full-Stack", "Delta Halo, JS"], 
        correct: "Arrow Functions, Recursion, Full-Stack"
    },
    {
        question: "Which of the following forms up the Web Trifecta?",
        answers: ["HTML, Javascript & Python","HTML, CSS & Java", "HTML, CSS & Javascript","Express, Node.js & React"], 
        correct: "HTML, CSS & Javascript"
    },
    {
        question: "Which of the following options defines Front-End?",
        answers: ["Server Side, Fetching, MySQL","Sequelize, MySQL & Back-End & ", "Node.js, NPM, Throw Error", "App Functionality, User Experience and Layout"], 
        correct: "App Functionality, User Experience and Layout"
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
            clearInterval(setTimer);
            displayResults();
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
generateNextQuestion ();
};

function generateNextQuestion () {
// clears questionChoicesEl container
currentQuestion += 1;
questionChoicesEl.innerHTML = "";
answerResponseEl.innerHTML = "";

// nextBtn.setAttribute("style","display: none;");

renderQuestionContainer();
};

function displayResults () {
    introEl.setAttribute("style","display: none;");
    quizQuestionContainer.setAttribute("style","display: none;");
    highScoresContainerEl.setAttribute("style","display: none;");
    resultsContainer.setAttribute("style", "display: block");
    
    userResults.innerHTML = `You answered ${userScoreEl} out of ${questionLengthEl} questions correctly.`
};

function renderHighScores () {

    //hides current elements on page
    introEl.setAttribute("style","display: none;");
    resultsContainerEl.setAttribute("style","display: none;");
    quizQuestionContainerEl.setAttribute("style","display: none;");
    highScoresContainerEl.setAttribute("style","display: block;");

    // renders lis within ul containing the text input and the value stores within score variable
    let scoresArray = scores || [];
    for (let i = 0; i<= 10; i++) {
        let liEl = document.createElement ("li");
        liEl.innerHTML = `${scoresArray[i].initials}: ${scoresArray[i].score}`;
        scoresListEl.append(liEl);
    };
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

    //render try again btn
    let tryAgainBtn = document.createElement ("button");
    tryAgainBtn.innerHTML = "Try Again"
    resultsContainerEl.append (tryAgainBtn);
    tryAgainBtn.onclick = gameReset;

    //hides text input and submit btn
    userInitialsEl.setAttribute("style", "display: none");
    submitLocalStorageBtn.setAttribute("style", "display: none");
    enterInitialsText.setAttribute("style", "display: none");
};

function gameReset () {
    location.reload();
};

// event listener functions//
highScoresButtonEl.addEventListener ("click", renderHighScores);
startButtonEl.addEventListener("click", startQuiz);
submitLocalStorageBtn.addEventListener ("click", addScoretoLS);
gameResetBtn.addEventListener ("click", gameReset);
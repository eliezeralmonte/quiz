// dom traversal items//
//header//
var highScoresButtonEl = document.querySelector("#highScoresButton");
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector("#startButton");
var introEl = document.querySelector("#intro");

//question variables //
var quizQuestionContainerEl = document.querySelector("#quizQuestionContainer");
var questionEl = document.querySelector("#question");
var answerListEl = document.querySelector("#answerList");
var submitButtonEl = document.querySelector("#submitButton");
var answersCountEl = document.querySelector("#answersCount");
//results//
var resultsEl = document.querySelector("#results");
var highScoresEl = document.querySelector("#highScores");

// global variables || questions array or object//

var userScore = 0;
var questions = [
    {   
        question: "What are the main primitive data types in Javascript?",
        answers: ["string, number, bigint, boolean, undefined, symbol, and null", "Ghosts, Warhogs, Tanks and Banshees", "Blue Team, Noble Team, ODST, and Spartans", "Paragraphs, Text Blocks, Equations, and Functions"], 
        correct: "string, number, bigint, boolean, undefined, symbol, and null"
    },
    {
        question: "??", 
        answers: ["a","b","c"], 
        correct: "b"
    }
];

// functions
//------------------------------//
// function to start quiz//
function renderQuestionContainer() {
    introEl.setAttribute("style", "display: none");
    quizQuestionContainerEl.setAttribute("style", "display: block");
    questionEl.innerHTML = questions[0].question;

// creates list to display an li containing 2 elements, first element will be a p, second element will be a radio button 
    let listEl = document.createElement("li");
    listEl.setAttribute("style", "display: flex; flex-direction: column;");
    answerListEl.append(listEl);

// this loop will create/set attributes and become appended to the li

    for(var i = 0; i <= questions[0].answers.length; i++) {
        let questionText = document.createElement("p");
        // let radioBtn = document.createElement("input");
        // radioBtn.setAttribute("type","radio");
        // radioBtn.setAttribute("style","margin-right: 5px; width: 10%;")
        questionText.innerHTML = questions[0].answers[i];
        listEl.append(questionText);
        // listEl.appendChild(radioBtn);

        
    }


    // for (var i = 0; i <= questions[0].answers.length; i++) {
    //     let questionLi = document.createElement ("li");
    //     questionLi = questions[0].answers[i]; 
    //     questionEl.appendChild(listEl);
    // }
}

console.log(questions[0].answers)

// event listener functions//
startButtonEl.addEventListener("click", renderQuestionContainer);

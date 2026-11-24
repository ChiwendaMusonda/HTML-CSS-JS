const startScreen = document.getElementById('start-screen')
const quizScreen = document.getElementById('quiz-screen')
const resultScreen = document.getElementById('result-screen')
const startButton = document.getElementById('start-btn')
const questionText = document.getElementById('question-text')
const answerContainer = document.getElementById('answer-container')
const currentQuestionSpan = document.getElementById('current-question')
const totalQuestionSpan = document.getElementById('question-total')
const totalQuestions = document.getElementById('total')
const scoreSpan = document.getElementById('current-score')
const finalScoreSpan = document.getElementById('final-score')
const maxScoreSpan = document.getElementById('max-score')
const resultMessage = document.getElementById('result-message')
const restartButton = document.getElementById('restart-btn')
const progressBar = document.getElementById('progress')


// quiz data..........................

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: 'London', correct: false },
            { text: 'Berlin', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Madrid', correct: false }
            
        ]
    },
    {
        question: "Which planet is known as the red planet?",
        answers: [
            { text: 'Venus', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
            
        ]
    },
    {
        question: "When did Zambia get Independence?",
        answers: [
            { text: '24 October, 1964', correct: true },
            { text: '18 October, 1964', correct: false },
            { text: '28 April, 1924', correct: false},
            { text: '02 October, 2000', correct: false }
            
        ]
    },
    {
        question: "What is the largest ocean on earth?",
        answers: [
            { text: 'Atlantic ocean', correct: false },
            { text: 'Indian ocean', correct: false },
            { text: 'Arctic ocean', correct: false },
            { text: 'Pacific', correct: true }
            
        ]
    },
    {
        question: "What is the chemical formula for gold?",
        answers: [
            { text: 'Go', correct: false },
            { text: 'Gd', correct: false },
            { text: 'Au', correct: true },
            { text: 'Ag', correct: false }
            
        ]
    },
    {
        question: "Which of the following is not a programming language?",
        answers: [
            { text: 'Java', correct: false },
            { text: 'Python', correct: false },
            { text: 'HTML', correct: true },
            { text: 'JavaScript', correct: false }
            
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: 'Computer Simulation Systems', correct: false },
            { text: 'Cascading Style Sheet', correct: true },
            { text: 'Complex Sophisticated Simulations', correct: false },
            { text: 'Component Styling Satellite', correct: false }
            
        ]
    },
    {
        question: "What is the capital of Zambia?",
        answers: [
            { text: 'Kabwe', correct: false },
            { text: 'Ndola', correct: false },
            { text: 'Livingstone', correct: false },
            { text: 'Lusaka', correct: true }
            
        ]
    },
]


// logic...............................
//-------------------------------------------------------------------------------------------------------------------------------------------//
// QUIZ STATE VARIABLES.......

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;


//  events....
startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", reStartQuiz)

// update question total
totalQuestionSpan.textContent = quizQuestions.length
maxScoreSpan.textContent = quizQuestions.length

//-------------------------------------------------------------------------------------------------------------------------------------------//
// event handlers..........
function startQuiz() {
    
    // quiz variable reset.
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;


    // show quiz screen....
    startScreen.classList.remove('active')
    quizScreen.classList.add('active')

    // show questions..
    showQuestions()
}

//------------------------------------------------------------------------------------------------------------------------------------------//

// show questions..........
function showQuestions(){
    // reset state
    answerDisabled = false

    // get questions
    const currentQuestion = quizQuestions[currentQuestionIndex]
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    //progress bar width calculation
    const progressPercentage = (currentQuestionIndex / quizQuestions.length) * 100;

    // updating the progress bar 
    progressBar.style.width = progressPercentage + "%"
    questionText.textContent = currentQuestion.question
    
    // todo:explain this in a second
    answerContainer.innerHTML = ''
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = answer.text
        button.classList.add('answer-btn')

        button.dataset.correct = answer.correct
        button.addEventListener("click", selectAnswer)
        answerContainer.appendChild(button)
    })

}


// ------------------------------------------------------------------------------------------------------------------------------------------//
// select answer  logic...
function selectAnswer(event) {
    // optimization check
    if (answerDisabled) { return }

    answerDisabled = true
// how to know what button was clicked
    const selectButton = event.target
    const isCorrect = selectButton.dataset.correct ==='true'
    Array.from(answerContainer.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct')
        }
        else {
            button.classList.add('incorrect')          
        }
    })

    // updating the score
    if (isCorrect) {
        score ++
        scoreSpan.textContent = score
    }

    // to delay for few seconds before we move to the next question
    setTimeout(() => {
        currentQuestionIndex++;
        // check if we still have more questions..
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestions()
        }
        else {
            showResults()
        }
    }, 1000)
}


//-------------------------------------------------------------------------------------------------------------------------------------------//
function showResults() {
    quizScreen.classList.toggle('active')
    resultScreen.classList.toggle('active')

    finalScoreSpan.textContent = score

    //   determine result message...
    const percentage = (score / quizQuestions.length) * 100
    if ( percentage === 100) {
        resultMessage.textContent = `Perfect! you are good 🎯.${percentage} %`
    }
    else if ( percentage >= 80) {
        resultMessage.textContent = `Great Job, you know your stuff ❤️.${percentage} %`
    }
    else if (percentage >= 60) {
        resultMessage.textContent = `Good effort, keep studying ✅.${percentage} %`
    }
    else if (percentage >= 40) {
        resultMessage.textContent = `Not bad, Try again to improve ✔️.${percentage} %`
    }
    else {
        resultMessage.textContent = `Keep studying, You will get better with time 🔄️.${percentage} %`
    }
    
}

//-------------------------------------------------------------------------------------------------------------------------------------------//

// restart questions.....

function reStartQuiz() {
    resultScreen.classList.toggle('active')
    startQuiz()
}
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "Berlin", "London", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "In which year did World War I begin?",
        choices: ["1914", "1915", "1916", "1917"],
        correctAnswer: "1914"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the capital of Japan?",
        choices: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correctAnswer: "Tokyo"
    },
    {
        question: "What is the main ingredient in guacamole?",
        choices: ["Avocado", "Tomato", "Onion", "Garlic"],
        correctAnswer: "Avocado"
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let timer;
let score = 0;
let timeLimit = 60;

const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const resultContainer = document.getElementById("result-container");
const submitBtn = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const highScoresList = document.getElementById("high-scores-list");
const timerDisplay = document.getElementById("timer-display");

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveHighScore);

function startQuiz() {
    startBtn.style.display = "none";
    score = 0;
    currentQuestionIndex = 0;
    timeLimit = 60;
    updateTimerDisplay();
    displayNextQuestion();
    startTimer();
}

function displayNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
        choicesContainer.innerHTML = "";

        currentQuestion.choices.forEach((choice, index) => {
            const choiceBtn = document.createElement("button");
            choiceBtn.textContent = choice;
            choiceBtn.addEventListener("click", () => checkAnswer(choice, currentQuestion.correctAnswer));
            choicesContainer.appendChild(choiceBtn);
        });

    } else {
        endQuiz();
    }
}

function checkAnswer(userChoice, correctAnswer) {
    if (userChoice === correctAnswer) {
        score += 10;
        resultContainer.textContent = "Correct!";
    } else {
        resultContainer.textContent = "Incorrect!";
        timeLimit -= 10;
    }

    currentQuestionIndex++;
    displayNextQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLimit > 0) {
            timeLimit--;
            updateTimerDisplay();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    questionContainer.textContent = "Quiz Over!";
    choicesContainer.innerHTML = "";
    resultContainer.textContent = "Your final score is " + score;
    submitBtn.style.display = "block";
    updateTimerDisplay();
}

function updateTimerDisplay() {
    timerDisplay.textContent = `Time: ${timeLimit}s`;
}

function saveHighScore() {
    const initials = prompt("Enter your initials:");
    const highScore = { initials, score };
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(highScore);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayHighScores();
}

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresList.innerHTML = "";
    highScores.forEach((score, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        highScoresList.appendChild(li);
    });
    scoreContainer.style.display = "block";
}

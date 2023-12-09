// Define quiz questions and answers
const questions = [
    { question: "What is the capital of France?", choices: ["Paris", "Berlin", "London", "Madrid"], correctAnswer: "Paris" },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let timer;
let score = 0;
const timeLimit = 60; // seconds

const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const resultContainer = document.getElementById("result-container");
const submitBtn = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const highScoresList = document.getElementById("high-scores-list");

// Event listener for start button
startBtn.addEventListener("click", startQuiz);

// Event listener for submit button
submitBtn.addEventListener("click", saveHighScore);

function startQuiz() {
    startBtn.style.display = "none";
    score = 0;
    currentQuestionIndex = 0;
    displayNextQuestion();
    startTimer();
}

function displayNextQuestion() {
    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
        choicesContainer.innerHTML = "";

        // Create choice buttons
        currentQuestion.choices.forEach((choice, index) => {
            const choiceBtn = document.createElement("button");
            choiceBtn.textContent = choice;
            choiceBtn.addEventListener("click", () => checkAnswer(choice, currentQuestion.correctAnswer));
            choicesContainer.appendChild(choiceBtn);
        });

    } else {
        // No more questions, end the quiz
        endQuiz();
    }
}

function checkAnswer(userChoice, correctAnswer) {
    if (userChoice === correctAnswer) {
        // Correct answer, increase score
        score += 10;
        resultContainer.textContent = "Correct!";
    } else {
        // Incorrect answer, deduct time
        resultContainer.textContent = "Incorrect!";
        timeLimit -= 10;
    }

    // Move to the next question
    currentQuestionIndex++;
    displayNextQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLimit > 0) {
            timeLimit--;
        } else {
            // Time is up, end the quiz
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
}

function saveHighScore() {
    const initials = prompt("Enter your initials:");
    const highScore = { initials, score };
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(highScore);
    highScores.sort((a, b) => b.score - a.score); // Sort in descending order
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

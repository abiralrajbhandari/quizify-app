// const questions = [
//   {
//     question:
//       "What is the value of the mathematical constant e (Euler's number) rounded to 4 decimal places?",
//     answers: [
//       { text: "2.7182", correct: true },
//       { text: "3.1415", correct: false },
//       { text: "1.4142", correct: false },
//       { text: "1.6180", correct: false },
//     ],
//   },
//   {
//     question:
//       "Who was the first person to win two Nobel Prizes in different sciences?",
//     answers: [
//       { text: "Marie Curie", correct: true },
//       { text: "Albert Einstein", correct: false },
//       { text: "Linus Pauling", correct: false },
//       { text: "Isaac Newton", correct: false },
//     ],
//   },
//   {
//     question: "Which of the following is the hardest known natural material?",
//     answers: [
//       { text: "Graphite", correct: false },
//       { text: "Diamond", correct: true },
//       { text: "Corundum", correct: false },
//       { text: "Quartz", correct: false },
//     ],
//   },
//   {
//     question:
//       "Which programming language is known as the 'mother of all languages'?",
//     answers: [
//       { text: "C", correct: false },
//       { text: "Fortran", correct: true },
//       { text: "Assembly", correct: false },
//       { text: "COBOL", correct: false },
//     ],
//   },
//   {
//     question: "What is the Heisenberg Uncertainty Principle related to?",
//     answers: [
//       { text: "Speed of light in a vacuum", correct: false },
//       { text: "Measurement of particle position and momentum", correct: true },
//       { text: "Relativity of time and space", correct: false },
//       { text: "Thermodynamic entropy", correct: false },
//     ],
//   },
// ];

// const questionElement = document.getElementById("question");
// const answerButtons = document.getElementById("answer-buttons");
// const nextButton = document.getElementById("next-btn");
// const resetButton = document.getElementById("reset-btn");

// let currentQuestionIndex = 0;
// let score = 0;

// // Start the quiz by resetting values and showing the first question
// function startQuiz() {
//   currentQuestionIndex = 0;
//   score = 0;
//   nextButton.innerHTML = "Next";
//   resetButton.style.display = "none"; // Hide reset button initially
//   showQuestions();
// }

// // Show the current question and its answers
// function showQuestions() {
//   removePrev();
//   const currentQuestion = questions[currentQuestionIndex];
//   questionElement.innerHTML = `${currentQuestionIndex + 1}. ${
//     currentQuestion.question
//   }`;
//   currentQuestion.answers.forEach(createAnswerButton);
// }

// // Create an answer button for each choice
// function createAnswerButton(answer) {
//   const button = document.createElement("button");
//   button.innerHTML = answer.text;
//   button.classList.add("btn");
//   button.addEventListener("click", selectAnswer);
//   answerButtons.appendChild(button);
//   button.dataset.correct = answer.correct;
// }

// // Remove previous answers and hide the next button
// function removePrev() {
//   nextButton.style.display = "none";
//   while (answerButtons.firstChild) {
//     answerButtons.removeChild(answerButtons.firstChild);
//   }
// }

// // Handle the answer selection and display feedback
// function selectAnswer(e) {
//   const selectedBtn = e.target;
//   const isCorrect = selectedBtn.dataset.correct === "true";

//   if (isCorrect) {
//     score++; // Increment score for correct answers
//   }

//   selectedBtn.classList.add(isCorrect ? "correct" : "incorrect");

//   // Disable all buttons and show the correct answers
//   Array.from(answerButtons.children).forEach((button) => {
//     if (button.dataset.correct === "true") {
//       button.classList.add("correct");
//     }
//     button.disabled = true;
//   });

//   // Show the next button and reset button
//   nextButton.style.display = "block";
//   resetButton.style.display = "block"; // Show reset button after answer is selected
// }

// // Show the final score after completing the quiz
// function showScore() {
//   removePrev();
//   questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
//   nextButton.innerHTML = "Play Again";
//   nextButton.style.display = "block";
//   resetButton.style.display = "none"; // Ensure reset button is visible
// }

// // Show the next question or the score based on current index
// function showNextQuest() {
//   currentQuestionIndex++;
//   if (currentQuestionIndex < questions.length) {
//     showQuestions();
//   } else {
//     showScore();
//   }
// }

// // Handle the next button click to move to the next question or restart the quiz
// nextButton.addEventListener("click", () => {
//   if (currentQuestionIndex < questions.length) {
//     showNextQuest();
//   } else {
//     startQuiz();
//   }
// });

// // Handle the reset button click to restart the quiz
// resetButton.addEventListener("click", startQuiz);

// // Initialize the quiz
// startQuiz();

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resetButton = document.getElementById("reset-btn");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Start the quiz by resetting values and fetching questions
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  resetButton.style.display = "none"; // Hide reset button initially
  fetchQuestions(); // Fetch questions from API
}

// Fetch questions from OpenTDB API
async function fetchQuestions() {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&category=9&type=multiple"
    );
    const data = await response.json();
    questions = data.results; // Store the fetched questions
    showQuestions();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

// Show the current question and its answers
function showQuestions() {
  removePrev();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${
    currentQuestion.question
  }`;
  const allAnswers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];
  allAnswers.sort(() => Math.random() - 0.5); // Shuffle the answers
  allAnswers.forEach((answer) =>
    createAnswerButton(answer, currentQuestion.correct_answer)
  );
}

// Create an answer button for each choice
function createAnswerButton(answer, correctAnswer) {
  const button = document.createElement("button");
  button.innerHTML = answer;
  button.classList.add("btn");
  button.addEventListener("click", (e) => selectAnswer(e, correctAnswer));
  answerButtons.appendChild(button);
}

// Remove previous answers and hide the next button
function removePrev() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Handle the answer selection and display feedback
function selectAnswer(e, correctAnswer) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.innerHTML === correctAnswer;

  if (isCorrect) {
    score++; // Increment score for correct answers
  }

  selectedBtn.classList.add(isCorrect ? "correct" : "incorrect");

  // Disable all buttons and show the correct answers
  Array.from(answerButtons.children).forEach((button) => {
    if (button.innerHTML === correctAnswer) {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  // Show the next button and reset button
  nextButton.style.display = "block";
  resetButton.style.display = "block"; // Show reset button after answer is selected
}

// Show the final score after completing the quiz
function showScore() {
  removePrev();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  resetButton.style.display = "none"; // Ensure reset button is visible
}

// Show the next question or the score based on current index
function showNextQuest() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

// Handle the next button click to move to the next question or restart the quiz
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    showNextQuest();
  } else {
    startQuiz();
  }
});

// Handle the reset button click to restart the quiz
resetButton.addEventListener("click", startQuiz);

// Initialize the quiz
startQuiz();

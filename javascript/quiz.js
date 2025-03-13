const quizData = {
    categories: [
      {
        id: "js_basics",
        name: "JavaScript Basics",
        questions: [
          {
            id: "q1",
            question:
              "What is the correct syntax for referring to an external script called 'script.js'?",
            options: [
              "A. <script name='script.js'>",
              "B. <script href='script.js'>",
              "C. <script src='script.js'>",
              "D. <script file='script.js'>",
            ],
            correctAnswer: "C",
            timeLimit: 10,
          },
          {
            id: "q2",
            question: "Which company developed JavaScript?",
            options: [
              "A. Microsoft",
              "B. Netscape",
              "C. Google",
              "D. Mozilla",
            ],
            correctAnswer: "B",
            timeLimit: 10,
          },
        ],
      },
      {
        id: "react_advance",
        name: "React.js Advance",
        questions: [
          {
            id: "q3",
            question: "What is a state in React?",
            options: [
              "A. A component",
              "B. A function",
              "C. An object",
              "D. A variable",
            ],
            correctAnswer: "C",
            timeLimit: 10,
          },
          {
            id: "q4",
            question:
              "Which hook is used to manage state in functional components?",
            options: [
              "A. useState",
              "B. useEffect",
              "C. useContext",
              "D. useReducer",
            ],
            correctAnswer: "A",
            timeLimit: 10,
          },
        ],
      },
      {
        id: "flutter",
        name: "Flutter",
        questions: [
          {
            id: "q5",
            question: "What is Flutter?",
            options: [
              "A. A web framework",
              "B. A mobile app SDK",
              "C. A database",
              "D. A programming language",
            ],
            correctAnswer: "B",
            timeLimit: 10,
          },
          {
            id: "q6",
            question: "Which language is used to write Flutter apps?",
            options: ["A. Java", "B. Kotlin", "C. Dart", "D. Swift"],
            correctAnswer: "C",
            timeLimit: 10,
          },
        ],
      },
      {
        id: "angular_basic",
        name: "Angular Basic",
        questions: [
          {
            id: "q7",
            question: "What is Angular?",
            options: [
              "A. A programming language",
              "B. A web framework",
              "C. A database",
              "D. An operating system",
            ],
            correctAnswer: "B",
            timeLimit: 10,
          },
          {
            id: "q8",
            question:
              "Which language is primarily used to write Angular applications?",
            options: [
              "A. JavaScript",
              "B. Python",
              "C. TypeScript",
              "D. Ruby",
            ],
            correctAnswer: "C",
            timeLimit: 10,
          },
        ],
      },
    ],
  };

  let currentQuestion = 0;
  let timer;
  let timeLeft = 10;
  let allQuestion = [];
  let currentTopic = "";
  let correctAnswersCount = 0; // Global variable to keep track of correct answers
  let unansweredQuestionsCount = 0; // Global variable to keep track of unanswered questions

  window.onload = () => {
    // Get query string from the URL
    const params = new URLSearchParams(window.location.search);

    // Get individual values
    const name = localStorage.getItem("name");
    const topic = localStorage.getItem("topic");

    if (!name && !topic) {
// Redirect to the home page if the name is not set
  window.location.href = 'index.html';
}
    currentTopic = topic;
    loadQuestion();
  };

  function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;

    allQuestion = quizData?.categories?.filter(
      (v) => v?.id === currentTopic
    )[0]?.questions;
    document.getElementById("totalQuestions").innerText =
      allQuestion?.length;
    const question = allQuestion[currentQuestion];

    document.getElementById("questionText").innerText = question.question;

    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "btn option-btn";
      button.innerText = option;
      button.onclick = () => selectAnswer(option, button);
      optionsContainer.appendChild(button);
    });

    // Start Timer
    startTimer();

    updateProgress();
    document.getElementById("nextButton").disabled = true;
  }

  function updateProgress() {
    document.getElementById("currentQuestionIndex").innerText =
      currentQuestion;
    document.getElementById("progressBar").style.width = `${
      (currentQuestion / allQuestion?.length) * 100
    }%`;
    if (currentQuestion === allQuestion.length - 1) {
      document.getElementById("nextButton").innerText = "Finish";
    }
  }

  function startTimer() {
    updateTimerDisplay();

    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timer);
        autoSubmitAnswer();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    document.getElementById("timer").innerText = `0:${
      timeLeft < 10 ? "0" + timeLeft : timeLeft
    }`;
  }

  function selectAnswer(answer, button) {
    clearInterval(timer);

    // Remove active state from other buttons
    document
      .querySelectorAll(".option-btn")
      .forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");

    // Check if the selected answer is correct
    const question = allQuestion[currentQuestion];
    if (answer.charAt(0) === question.correctAnswer) {
      correctAnswersCount++;
    }

    document.getElementById("nextButton").disabled = false;
  }

  function autoSubmitAnswer() {
    // Increment unanswered questions count
    unansweredQuestionsCount++;
    // Auto-submit and navigate to next question
    nextQuestion();
  }

  function nextQuestion() {
    if (currentQuestion < allQuestion.length - 1) {
      currentQuestion++;
    } else {
      // Store the score and unanswered questions count in local storage
      localStorage.setItem("quizScore", correctAnswersCount);
      localStorage.setItem("totalQuestions", allQuestion.length);
      localStorage.setItem("unansweredQuestions", unansweredQuestionsCount);
      // Redirect to result page
      window.location.href = "result.html";
      return;
    }
    updateProgress();
    loadQuestion();
  }

  function skipQuestion() {
    // Increment unanswered questions count
    unansweredQuestionsCount++;
    nextQuestion();
  }

  // Event Listener for "Next" Button
  document
    .getElementById("nextButton")
    .addEventListener("click", nextQuestion);
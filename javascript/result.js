// Get data from local storage
const name = localStorage.getItem('name') || '';
const totalQuestions = parseInt(localStorage.getItem('totalQuestions')) || 0;
const correctAnswers = parseInt(localStorage.getItem('quizScore')) || 0;
const unanswered = parseInt(localStorage.getItem('unansweredQuestions')) || 0;
const incorrectAnswers = totalQuestions - (correctAnswers + unanswered);

if (!name && !totalQuestions && !correctAnswers) {
  // Redirect to the home page if the name is not set
  window.location.href = 'index.html';
}

// Display user's name in the button
document.getElementById('user-name').textContent = name;
document.getElementById('user-avatar').textContent = name.charAt(0).toUpperCase();

// Calculate score
const score = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

// Generate Result
const resultContainer = document.getElementById('result-container');
if (score >= 50) {
  resultContainer.innerHTML = `
    <h2 class="title-success">CONGRATULATIONS!</h2>
    <p>You successfully completed the quiz, ${name}!</p>
    <h3 class="score-success">${score}%</h3>
    <p class="feedback-success">Great job!</p>
    <div class="result-summary">
      <p><span class="text-success">${correctAnswers}</span> Correct, 
      <span class="text-danger">${incorrectAnswers}</span> Incorrect, 
      <span class="text-warning">${unanswered}</span> Not answered</p>
    </div>
  `;
} else {
  resultContainer.innerHTML = `
    <h2 class="title-fail">KEEP PRACTICING!</h2>
    <p>You completed the quiz, but you need to improve, ${name}!</p>
    <h3 class="score-fail">${score}%</h3>
    <p class="feedback-fail">Better luck next time!</p>
    <div class="result-summary">
      <p><span class="text-success">${correctAnswers}</span> Correct, 
      <span class="text-danger">${incorrectAnswers}</span> Incorrect, 
      <span class="text-warning">${unanswered}</span> Not answered</p>
    </div>
  `;
}

// Retake Quiz Button
document.getElementById('retake-btn').addEventListener('click', () => {
  window.location.href = 'index.html';
});
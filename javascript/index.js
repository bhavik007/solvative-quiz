function validateForm() {
    const fullName = document.getElementById('fullName').value;
    const topic = document.querySelector('input[name="topic"]:checked');
    const startQuizBtn = document.getElementById('startQuizBtn');
    startQuizBtn.disabled = !(fullName && topic);
  }
  
  document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const topic = document.querySelector('input[name="topic"]:checked').value;
  
    // Store data in local storage
    localStorage.setItem('name', fullName);
    localStorage.setItem('topic', topic);
  
    // Redirect to quiz page with query parameters
    window.location.href = `quiz.html`;
  });

  window.onload = () => {
    localStorage.clear();
  };
window.onload = () => {
  // Get query string from the URL
  const params = new URLSearchParams(window.location.search);

  // Get individual values
  const name = localStorage.getItem('name');
  const topic = localStorage.getItem('topic');


  if (!name && !topic) {
    // Redirect to the home page if the name is not set
      window.location.href = 'index.html';
  }
};
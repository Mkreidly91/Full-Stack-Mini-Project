window.onload = () => {
  const email = localStorage.getItem('email');
  const welcome = document.getElementById('welcome');
  welcome.innerText = `hello ${email}`;
};

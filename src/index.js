window.onload = () => {
  const register_email = document.getElementById('register-email');
  const register_password = document.getElementById('password');
  const registration_form = document.getElementById('register');
  const register_button = document.getElementById('submit-button');

  register_button.addEventListener('click', () => {
    console.log('hello');
    console.log(register_email.value);
  });
};

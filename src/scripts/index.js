window.onload = () => {
  const signup_path =
    'http://localhost/project/Full-stack-mini-project/api/signup.php';
  const signin_path =
    'http://localhost/project/Full-stack-mini-project/api/signin.php';

  const register_email = document.getElementById('register-email');
  const register_password = document.getElementById('register-password');
  const confirm_password = document.getElementById('confirm-password');
  const register_button = document.getElementById('submit-button');
  const r_email_error = document.getElementById('r-email-error');
  const r_password_error = document.getElementById('r-password-error');
  const r_confirm_error = document.getElementById('r-confirm-error');
  const login_email = document.getElementById('login-email');
  const login_password = document.getElementById('login-password');
  const login_button = document.getElementById('login-button');
  const login_error = document.getElementById('login-error');
  const login_pass_error = document.getElementById('login-pass-error');
  const success = document.getElementById('success');

  login_button.addEventListener('click', async () => {
    if (!login_email.value) {
      login_error.textContent = 'Please provide an email';
      return;
    } else if (!login_password.value) {
      login_pass_error.textContent = 'Please provide an password';
      return;
    }
    try {
      const user = {
        email: login_email.value,
        password: login_password.value,
      };
      console.log(user.email);
      const res = await fetch(signin_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const result = await res.json();
      console.log(result);
      if (result.status === 'user not found') {
        login_error.innerText = 'Invalid User';
      } else if (result.status === 'wrong password') {
        login_pass_error.innerText = 'Invalid Password';
      } else if (result.status === 'logged in') {
        localStorage.setItem('email', user.email);
        window.location.href = 'welcome.html';
      }
    } catch (error) {
      console.log(error);
    }
  });
  register_button.addEventListener('click', async () => {
    const email_value = register_email.value;
    const password_value = register_password.value;
    const confirm_password_value = confirm_password.value;

    if (!email_value) {
      r_email_error.textContent = 'Please provide an email';
      return;
    } else if (!password_value) {
      r_password_error.textContent = 'Please provide an password';
      return;
    } else if (!confirm_password_value) {
      r_confirm_error.textContent = 'Please confirm pass';
      return;
    } else if (confirm_password_value !== password_value) {
      r_confirm_error.textContent = 'Passwords dont match';
    }
    try {
      const user = {
        email: email_value,
        password: password_value,
      };
      const res = await fetch(signup_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const result = await res.json();
      console.log(result);
      if (result.status === 'success') {
        success.innerText = result.message;
      } else if (result.status === 'failed') {
        success.innerText = result.message;
      }
    } catch (error) {
      console.log(error);
    }
  });
};

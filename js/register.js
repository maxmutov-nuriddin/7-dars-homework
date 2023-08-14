document.addEventListener('DOMContentLoaded', function () {
  let email = document.querySelector('.email');
  let password = document.querySelector('.password');
  let btn = document.querySelector('.btn');

  btn.addEventListener('click', function (event) {
    event.preventDefault();

    let userEmail = email.value;
    let userPassword = password.value;

    if (!userEmail || !userPassword) {
      alert('Пожалуйста, заполните все поля.');
    } else if (!userEmail.includes('@')) {
      alert('Пожалуйста, введите корректный email адрес.');
    } else {
      window.location.href = '../data.html';
    }
  });
});

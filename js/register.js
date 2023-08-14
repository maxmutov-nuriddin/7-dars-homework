document.addEventListener('DOMContentLoaded', function () {
  if (!localStorage.getItem('firstVisit')) {
    localStorage.setItem('firstVisit', 'true');
    box.classList.add('hidden')
    showLoader();
    setTimeout(function () {
      window.location.href = '../data.html';
    }, 2000);
  } else {
    let email = document.querySelector('.email');
    let password = document.querySelector('.password');
    let btn = document.querySelector('.btn');
    let box = document.querySelector('.container');
    let body = document.querySelector('.body');

    btn.addEventListener('click', function (event) {
      event.preventDefault();

      let userEmail = email.value;
      let userPassword = password.value;

      if (!userEmail || !userPassword) {
        alert('Пожалуйста, заполните все поля.');
      } else if (!userEmail.includes('@')) {
        alert('Пожалуйста, введите корректный email адрес.');
      } else {
        box.classList.add('hidden');
        showLoader();
        setTimeout(function () {
          window.location.href = '../data.html';
        }, 2000);
      }
    });
  }
});

function showLoader() {
  let loader = document.createElement('div');
  loader.className = 'spinner';
  for (let i = 0; i < 3; i++) {
    let div = document.createElement('div');
    loader.prepend(div)
  }
  document.body.appendChild(loader);
}
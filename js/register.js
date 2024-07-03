// ? =============> Global ===============>
const inputs = document.querySelectorAll('input');
const btnRegister = document.getElementById('btnRegister');
const formData = document.querySelector('form');
const message = document.getElementById('msg');
const mode = document.getElementById("mode");

const firstName = inputs[0];
const lastName = inputs[1];
const email = inputs[2];
const password = inputs[3];
const age = inputs[4];

let isValid = false;

// ! =============> When Start ===============>

if (localStorage.getItem("theme") != null) {
  const themeData = localStorage.getItem("theme"); // light Or dark

  if (themeData === "light") {
      mode.classList.replace("fa-sun", "fa-moon"); // sun to moon
  } else {
      mode.classList.replace("fa-moon", "fa-sun"); // moon to sun
  }

  document.documentElement.setAttribute("data-theme", themeData); // light Or dark
}

// * =============> Events ===============>

formData.addEventListener('submit', function (e) {
  e.preventDefault()
  
  if (isValid) {
    setForm();
  }
})

formData.addEventListener('input', function () {
  if (
    validName(firstName) &&
    validName(lastName) &&
    validEmail() &&
    validPassword() &&
    validAge()
  ) {
    isValid = true;
  } else {
    isValid = false;
  }
});


mode.addEventListener("click", function (e) {

  if (mode.classList.contains("fa-sun")) {
     mode.classList.replace("fa-sun", "fa-moon");

     document.documentElement.setAttribute("data-theme", "light");

     localStorage.setItem("theme", "light");
  } else {
     mode.classList.replace("fa-moon", "fa-sun");

     document.documentElement.setAttribute("data-theme", "dark");

     localStorage.setItem("theme", "dark");
  }

});

// ! =============> Functions ===============>

function setForm () {
  const user = {
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    password: password.value,
    age: age.value
  }

  console.log(user)
  registerForm(user)
}

async function registerForm (userData) {
  const api = await fetch(`https://movies-api.routemisr.com/signup`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const response = await api.json();

  if (response.message === 'success') {
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    password.value = "";
    age.value = "";
    firstName.classList.remove('is-valid');
    lastName.classList.remove('is-valid');
    email.classList.remove('is-valid');
    password.classList.remove('is-valid');
    age.classList.remove('is-valid');

    message.innerText = response.message;
  } else {
    message.innerText = response.errors?.email.message;
  }

  console.log(response)
}

// ? =============> Validation ===============>

function validName (input) {
  const regexStyle =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/

  if (regexStyle.test(input.value)) {
    input.classList.add('is-valid')
    input.classList.remove('is-invalid')

    return true
  } else {
    input.classList.add('is-invalid')
    input.classList.remove('is-valid')

    return false
  }
}

function validEmail () {
  const regexStyle =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

  if (regexStyle.test(email.value)) {
    email.classList.add('is-valid')
    email.classList.remove('is-invalid')

    return true
  } else {
    email.classList.add('is-invalid')
    email.classList.remove('is-valid')

    return false
  }
}

function validPassword () {
  const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (regexStyle.test(password.value)) {
    password.classList.add('is-valid')
    password.classList.remove('is-invalid')

    return true
  } else {
    password.classList.add('is-invalid')
    password.classList.remove('is-valid')

    return false
  }
}

function validAge () {
  const regexStyle = /^([1-7][0-9]|80)$/

  if (regexStyle.test(age.value)) {
    age.classList.add('is-valid')
    age.classList.remove('is-invalid')

    return true
  } else {
    age.classList.add('is-invalid')
    age.classList.remove('is-valid')

    return false
  }
}

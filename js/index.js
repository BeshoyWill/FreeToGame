// ? =============> Global ===============>
const inputs = document.querySelectorAll('input');
const btnLogin = document.getElementById('btnLogin');
const formData = document.querySelector('form');
const message = document.getElementById('msg');
const mode = document.getElementById("mode");


const email = inputs[0];
const password = inputs[1];

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
    validEmail() &&
    validPassword()
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
    email: email.value,
    password: password.value
  }

  console.log(user)
  loginForm(user)
}

async function loginForm (userData) {
  const api = await fetch(`https://movies-api.routemisr.com/signin`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const response = await api.json();

  if (response.message === 'success') {
   localStorage.setItem('uToken', response.token);
   location.href = "./home.html";
  } else {
   message.innerText = response.message;
  }

  console.log(response)
}

// ? =============> Validation ===============>

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
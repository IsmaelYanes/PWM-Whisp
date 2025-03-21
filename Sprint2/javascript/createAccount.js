document.addEventListener("DOMContentLoaded", () => {
    loadComponent("../templates/header.html", "header-base");
    loadComponent("../templates/footer.html", "footer-base");
    loadComponent("../templates/createAccount.html", "createAccount", addCreateAccountEventListeners);
});

function loadComponent(url, containerId, callback = null) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Error cargando ${url}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error(error));
}

function postNewUser(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const birthday = document.getElementById("birthday").value;
    const newUser = {
        email: email,
        password: password,
        username: username,
        birthday: birthday
    };
    fetch('http://localhost:3000/users',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
    }).catch(error => console.error(error));
}


function addCreateAccountEventListeners() {
    const createAccountButton = document.getElementById("createAccountButton");

    if (createAccountButton) {
        createAccountButton.addEventListener("click", validateCreateAccountForm);
    }
}

function validateCreateAccountForm(event) {
    event.preventDefault(); // Evita el envío si hay errores

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const userName = document.getElementById("user-name").value.trim();
    const birthday = document.getElementById("birthdate").value.trim();

    const emailRegex = /^(?=[^@]*[a-zA-Z])([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])(?=.{8,}).+$/;

    let isValid = true;

    const emailError = document.getElementById("emailError");
    const emailInput = document.getElementById("email");

    const passwordError = document.getElementById("passwordError");
    const passwordInput = document.getElementById("password");

    const confirmPasswdError = document.getElementById("confirmPasswordError");
    const confirmPasswdInput = document.getElementById("confirm-password");

    const userNameError = document.getElementById("userNameError");
    const userNameInput = document.getElementById("user-name");

    const birthdayError = document.getElementById("birthdateError");
    const birthdayInput = document.getElementById("birthdate");
    
    if (!email) {
        emailError.textContent = "El correo es obligatorio.";
        basicStyleError(emailError, emailInput);
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = "El correo no cumple con el formato válido.";
        basicStyleError(emailError, emailInput);
        isValid = false;
    } else {
        normalStyle(emailError);
    }

    if (!password) {
        passwordError.textContent = "La contraseña es obligatoria.";
        basicStyleError(passwordError, passwordInput);
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        passwordError.textContent = "La contraseña debe tener al menos 8 caracteres, " +
            "incluir una letra mayúscula, una minúscula, un número y un carácter especial.";
        basicStyleError(passwordError, passwordInput);
        isValid = false;
    } else {
        normalStyle(passwordError);
    }

    if (!confirmPassword) {
        confirmPasswdError.textContent = "La contraseña es obligatoria.";
        basicStyleError(confirmPasswdError, confirmPasswdInput);
        isValid = false;
    } else if (password !== confirmPassword) {
        confirmPasswdError.textContent = "Las contraseñas no coinciden.";
        basicStyleError(confirmPasswdError, confirmPasswdInput);
        isValid = false;
    } else {
        normalStyle(confirmPasswdError);
    }

    if (!userName) {
        userNameError.textContent = "Introduzca un nombre de usuario";
        basicStyleError(userNameError, userNameInput);
        isValid = false;
    } else {
        normalStyle(userNameError);
    }
    
    if (!birthday) {
        birthdayError.textContent = "Introduzca la fecha de nacimiento";
        basicStyleError(birthdayError, birthdayInput);
        isValid = false;
    } else if (validateBirthday(birthday) === false) {
        birthdayError.textContent = "Debes de ser mayor a 8 años";
        basicStyleError(birthdayError, birthdayInput);
        isValid = false;
    } else {
        normalStyle(birthdayError);
    }

    if (isValid) {
        alert("Inicio de sesión exitoso.");
        document.getElementById("createAccount-Form").submit(); // Envía el formulario si todo está correcto
    }
}

function normalStyle(nameId) {
    nameId.textContent = "";
    nameId.style.display = "none";
    nameId.style.border = "2px solid #A8A8A8";
}

function validateBirthday(birthday) {
    const actualDate = new Date();
    const birthdayDate = new Date(birthday);
    
    let age = actualDate.getFullYear() - birthdayDate.getFullYear();
    
    return age >= 8;
}

function basicStyleError(error, input) {
    error.style.display = "block";
    input.style.border = "2px solid red";
}
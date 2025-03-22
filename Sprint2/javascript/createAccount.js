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

function submitNewUser(){
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userName: document.getElementById("user-name").value,
            password: document.getElementById("password").value, 
            email: document.getElementById("email").value,
            birthday: document.getElementById("birthdate").value,})
    })
        .then(response => response.json())
        .then(data => {console.log("Usuario creado", data)})
        .catch(error => console.error("Error", error));
}


function addCreateAccountEventListeners() {
    const createAccountButton = document.getElementById("createAccountButton");

    if (createAccountButton) {
        createAccountButton.addEventListener("click", validateCreateAccountForm);
    }
}

async function validateCreateAccountForm(event) {
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
    } else if (await existUserEmail(email)) {
        emailError.textContent = "Ya existe el usuario";
        basicStyleError(emailError, emailInput);
        isValid = false;
    } else {
        normalStyle(emailError, emailInput);
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
        normalStyle(passwordError, passwordInput);
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
        normalStyle(confirmPasswdError, confirmPasswdInput);
    }

    if (!userName) {
        userNameError.textContent = "Introduzca un nombre de usuario";
        basicStyleError(userNameError, userNameInput);
        isValid = false;
    } else if (await existUserName(userName)) {
        userNameError.textContent = "Ya existe el username";
        basicStyleError(userNameError, userNameInput);
        isValid = false;
    }else {
        normalStyle(userNameError, userNameInput);
    }
    
    if (!birthday) {
        birthdayError.textContent = "Introduzca la fecha de nacimiento";
        basicStyleError(birthdayError, birthdayInput);
        isValid = false;
    } else if (!validateBirthday(birthday)) {
        birthdayError.textContent = "Debes de ser mayor a 8 años";
        basicStyleError(birthdayError, birthdayInput);
        isValid = false;
    } else {
        normalStyle(birthdayError, birthdayInput);
    }
    
    if (isValid) {
        submitNewUser();
        alert("Inicio de sesión exitoso.");
        document.getElementById("createAccount-Form").submit(); // Envía el formulario si todo está correcto
        window.location.href = "../pages/logInPage.html";
    }
}

function normalStyle(error, input) {
    error.textContent = "";
    error.style.display = "none";
    input.style.border = "2px solid #A8A8A8";
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

async function existUserEmail(email) {
    try {
        const response = await fetch("http://localhost:3000/users?email=" + email);
        const data = await response.json();
        return data.length > 0;
    } catch {
        return false;
    }
}

async function existUserName(userName) {
    try {
        const response = await fetch("http://localhost:3000/users?userName=" + userName);
        const data = await response.json();
        return data.length > 0;
    } catch {
        return false;
    }
}

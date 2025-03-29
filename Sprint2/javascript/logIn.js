document.addEventListener("DOMContentLoaded", () => {
    loadComponent("../templates/header.html", "header-base");
    loadComponent("../templates/logIn.html", "login", addEventListeners);
    loadComponent("../templates/footer.html", "footer-base");
});

function loadComponent(url, containerId, callback = null) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Error cargando ${url}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (callback) callback(); // Ejecuta la función después de cargar el contenido
        })
        .catch(error => console.error(error));
}

function submitExistUser(){
    const email = document.getElementById("email").value.trim();

    fetch("http://localhost:3000/users?email=" + email, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const user = data[0];
                alert("Inicio de sesión exitoso." );
                document.getElementById("logIn-Form").submit();
                window.location.href = `../pages/mainPage.html?userID=${user.id}`;
            } else {
                alert("Usuario no encontrado");
            }
        })
        .catch(error => console.error("Error", error));
}

function addEventListeners() {
    const loginButton = document.getElementById("login-button");

    if (loginButton) {
        loginButton.addEventListener("click", validateLogInForm);
    }
}

async function validateLogInForm(event) {
    event.preventDefault(); // Evita el envío si hay errores

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailRegex = /^(?=[^@]*[a-zA-Z])([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])(?=.{8,}).+$/;

    let isValid = false;

    const emailError = document.getElementById("emailError");
    const emailInput = document.getElementById("email");
    const passwordError = document.getElementById("passwordError");
    const passwordInput = document.getElementById("password");

    if (!email) {
        emailError.textContent = "El correo es obligatorio.";
        basicStyleError(emailError, emailInput);
    } else if (!emailRegex.test(email)) {
        emailError.textContent = "El correo no cumple con el formato válido.";
        basicStyleError(emailError, emailInput);
    } else if (!await existUserEmail(email)) {
        emailError.textContent = "El usuario no existe.";
        basicStyleError(emailError, emailInput);
    } else {
        normalStyle(emailError, emailInput);
    }

    if (!password) {
        passwordError.textContent = "La contraseña es obligatoria.";
        basicStyleError(passwordError, passwordInput);
    } else if (!passwordRegex.test(password)) {
        passwordError.textContent = "La contraseña debe tener al menos 8 caracteres, " +
            "incluir una letra mayúscula, una minúscula, un número y un carácter especial.";
        basicStyleError(passwordError, passwordInput);
    } else if (!await correctPassword(email, password)) {
        passwordError.textContent = "La contraseña no coincide.";
        basicStyleError(passwordError, passwordInput);
    } else {
        normalStyle(passwordError, passwordInput);
        isValid = true;
    }

    if (isValid) {
        submitExistUser();
    }
}

function normalStyle(error, input) {
    error.textContent = "";
    error.style.display = "none";
    input.style.border = "2px solid #A8A8A8";
}

function basicStyleError(error, input) {
    error.style.display = "block";
    input.style.border = "2px solid red";
}

async function existUserEmail(userEmail) {
    try {
        const response = await fetch("http://localhost:3000/users?email=" + userEmail);
        const data = await response.json();
        return data.length > 0;
    } catch {
        return false;
    }
}

async function correctPassword(userEmail, password) {
    try {
        const response = await fetch("http://localhost:3000/users?email=" + userEmail);
        const data = await response.json();
        if (data.length > 0) {
            const user = data[0];
            const encodedPassword = await hashPassword(password);
            if (encodedPassword !== user.password) {
                return false;
            }
        }
        return true;
    } catch {
        return false;
    }
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hash = await crypto.subtle.digest('SHA-256', data);

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}
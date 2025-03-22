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

                alert("Inicio de sesión exitoso.");
                document.getElementById("logIn-Form").submit(); // Envía el formulario si todo está correcto
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

function validateLogInForm(event) {
    event.preventDefault(); // Evita el envío si hay errores

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailRegex =  /^(?=[^@]*[a-zA-Z])([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])(?=.{8,}).+$/;

    let isValid = true;

    const emailError = document.getElementById("emailError");
    const emailInput = document.getElementById("email");
    const passwordError = document.getElementById("passwordError");
    const passwordInput = document.getElementById("password");

    if (!email) {
        emailError.textContent = "El correo es obligatorio.";
        emailError.style.display = "block";
        emailInput.style.border = "2px solid red";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = "El correo no cumple con el formato válido.";
        emailError.style.display = "block";
        emailInput.style.border = "2px solid red";
        isValid = false;
    } else {
        emailError.textContent = "";
        emailError.style.display = "none";
        emailInput.style.border = "2px solid #A8A8A8";
    }

    if (!password) {
        passwordError.textContent = "La contraseña es obligatoria.";
        passwordError.style.display = "block";
        passwordInput.style.border = "2px solid red";
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        passwordError.textContent = "La contraseña debe tener al menos 8 caracteres, " +
            "incluir una letra mayúscula, una minúscula, un número y un carácter especial.";
        passwordError.style.display = "block";
        passwordInput.style.border = "2px solid red";
        isValid = false;
    } else {
        passwordError.textContent = "";
        passwordError.style.display = "none";
        passwordInput.style.border = "2px solid #A8A8A8";
    }

    if (isValid) {
        submitExistUser();
    }
}

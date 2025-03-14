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

function addEventListeners() {
    const togglePasswordBtn = document.getElementById("toggle-Password");
    const loginButton = document.getElementById("login-button");

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener("click", function () {
            const passwordInput = document.getElementById("password");
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        });
    }

    if (loginButton) {
        loginButton.addEventListener("click", validateLogInForm);
    }
}

function validateLogInForm(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailRegex = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]{1,3}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    let errors = [];

    if (!email) {
        errors.push("El correo es obligatorio.");
    } else if (!emailRegex.test(email)) {
        errors.push("El correo no cumple con el formato válido.");
    }

    if (!password) {
        errors.push("La contraseña es obligatoria.");
    } else if (!passwordRegex.test(password)) {
        errors.push("La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        alert("Inicio de sesión exitoso.");
        document.getElementById("logInForm").submit();
    }
}

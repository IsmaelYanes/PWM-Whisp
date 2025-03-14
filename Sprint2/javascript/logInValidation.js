document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("logInButton").addEventListener("click", validateLogInForm);
});

function validateLogInForm(event) {
    event.preventDefault(); // Evita el envío si hay errores

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
        alert(errors.join("\n")); // Muestra los errores en un alert
    } else {
        alert("Inicio de sesión exitoso.");
        document.getElementById("logInForm").submit(); // Envía el formulario si todo está correcto
    }
}

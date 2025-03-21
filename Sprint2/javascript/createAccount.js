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
    document.querySelectorAll(".toggle-Password").forEach(button => {
        button.addEventListener("click", function () {
            const input = this.previousElementSibling;
            input.type = input.type === "password" ? "text" : "password";
        });
    });

    document.getElementById("createAccountButton").addEventListener("click", function () {
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-Password").value;
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
        } else {
            postNewUser();
            alert("Cuenta creada con éxito.");
            window.location.href = "../pages/mainPage.html";
        }
    });
}

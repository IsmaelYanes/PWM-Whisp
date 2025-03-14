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
            alert("Cuenta creada con éxito.");
        }
    });
}

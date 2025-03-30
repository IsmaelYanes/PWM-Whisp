document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    changePassword();
    return false; // Añade esto para mayor seguridad
});

function changePassword() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("userID");
    console.log("ID del usuario:", id);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])(?=.{8,}).+$/;

    fetch("http://localhost:3000/users?id=" + id, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => response.json())
        .then(async data => {
            if (data.length > 0) {
                const user = data[0];
                const currentPassword = document.getElementById("currentPassword").value;
                const newPassword = document.getElementById("newPassword").value;
                const confirmPassword = document.getElementById("confirmPassword").value;

                if (currentPassword !== user.password) {
                    alert("La contraseña actual no coincide");
                } else if (!passwordRegex.test(newPassword)) {
                    alert("La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
                } else if (confirmPassword !== newPassword) {
                    alert("La nueva contraseña y la confirmación no coinciden");
                } else {
                    await change(id, newPassword);
                    alert("Se ha cambiado la contraseña correctamente");
                }
            } else {
                alert("Error: Usuario no encontrado.");
            }
        })
        .catch(error => console.error("Error", error));
}


async function change(id, newPasswd) {
    const hashedPassword = await hashPassword(newPasswd);

    return fetch("http://localhost:3000/users?id=" + id, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ password: hashedPassword })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .catch(error => {
            alert("No se ha podido cambiar la contraseña");
            console.error("Error:", error);
        });
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hash = await crypto.subtle.digest('SHA-256', data);

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

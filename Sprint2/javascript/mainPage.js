let myUser;

function loadUserId(){
    myUser = new URLSearchParams(window.location.search).get("userID");
}

document.addEventListener('DOMContentLoaded', function(){
    loadUserId();
    loadUsersData(myUser).then(init);
    loadChatsData();

});

function loadTemplate(fileName, id, callback) {
    fetch(fileName).then((res) => {
        return res.text();
    }).then((text) => {
        document.getElementById(id).innerHTML = text;
        if(callback){
            callback();
        }
    })
}

function switchWindow(id) {
    let contentWindows = document.getElementsByClassName("contentWindow");
    for (let i = 0; i < contentWindows.length; i++) {
        if (i === id) {
            contentWindows[i].style.display = "flex";
        } else {
            contentWindows[i].style.display = "none";
        }
    }
}



function loadProfileTable(rows, col, path){
    let counter = 0;
    const table = document.getElementById('profileTable');
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < col; j++) {
            const cell = document.createElement('td');
            const img = document.createElement('img');
            let pathName = `${path}/${counter}.jpg`;
            img.src = pathName;
            img.classList.add('profile-image');
            cell.appendChild(img);
            cell.onclick = function () {
                document.getElementById("profileSetting").src = pathName;
            }
            row.appendChild(cell);
            counter++;
        }
        table.appendChild(row);
    }
}

function changeProfilePhoto(){
    let photos = document.getElementsByClassName("photo");
    photos[0].src = photos[1].src;
}
function loadEditWindow(){
    loadProfileTable(5,5,"../images/icons")
}
function init() {
    loadTemplate('../templates/header.html', 'header')
    loadTemplate('../templates/chatPanel.html', 'bodyFrame', loadChats)
    loadTemplate('../templates/userPhoto.html', 'userProfile',loadProfilePhoto)
    loadTemplate('../templates/toolbar.html', 'toolBar')
    loadTemplate('../templates/chatWindow.html', 'chatWindow')
    loadTemplate('../templates/sendWindow.html', 'sendWindow')
    loadTemplate('../templates/voiceMailRequest.html', 'voiceMailRequest')
    loadTemplate('../templates/editWindow.html', 'editWindow', loadEditWindow)
    loadTemplate('../templates/requestWindow.html', 'requestWindow', loadRequests)
    loadTemplate('../templates/setting.html', 'settingWindow', changeTheme)
    loadTemplate('../templates/footer.html', 'footer')
    loadTemplate('../templates/chatPageForMobile.html', 'message',loadChatsForMobile)
    loadTemplate('../templates/messageAudio.html', 'requestVoiceMessage')
}

function changeTheme() {
    const themeSelect = document.getElementById("themeSelect");
    console.log("hhhh");
    themeSelect.addEventListener("change", function () {
        const selectedTheme = themeSelect.value;
        const windows = document.querySelectorAll(".contentWindow");
        const container = document.querySelectorAll(".player-container");
        if (selectedTheme === "dark") {
            windows.forEach((el) => {
                el.style.backgroundColor = "#27374D";
            });
            container.forEach((item) => {
                item.style.backgroundColor = "#DDE6ED";
            })
            document.querySelector(".toolbar").style.backgroundColor = "#526D82";
            document.querySelector(".chat-panel").style.backgroundColor = "#9DB2BF";
            document.querySelector(".chatPanel-container").style.backgroundColor = "#9DB2BF";
        }
        if (selectedTheme === "normal") {
            windows.forEach((el) => {
                el.style.backgroundColor = "#e5ddd5";
            });
            container.forEach((item) => {
                item.style.backgroundColor = "#fff";
            })
            document.querySelector(".toolbar").style.backgroundColor = "#7b92ac";
            document.querySelector(".chat-panel").style.backgroundColor = "#fff";
            document.querySelector(".chatPanel-container").style.backgroundColor = "#fff";
        }
    });

    document.getElementById("passwordForm").addEventListener("submit", function() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("userID");
        console.log("ID del usuario:", id);
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])(?=.{8,}).+$/;

        fetch("http://localhost:3000/users?id=" + id, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(async data => {  // Hacer la función async para esperar hashPassword
                console.log(data);
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
    });

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

}

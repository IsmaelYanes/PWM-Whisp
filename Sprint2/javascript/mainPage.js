const myUser = new URLSearchParams(window.location.search).get("userID");
document.addEventListener('DOMContentLoaded', init);

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
    loadTemplate('../templates/sendWindow.html', 'sendWindow')
    loadTemplate('../templates/voiceMailRequest.html', 'voiceMailRequest')
    loadTemplate('../templates/editWindow.html', 'editWindow', loadEditWindow)
    loadTemplate('../templates/requestWindow.html', 'requestWindow', loadRequests)
    loadTemplate('../templates/setting.html', 'settingWindow', changeTheme)
    loadTemplate('../templates/footer.html', 'footer')
    loadTemplate('../templates/messageAudio.html', 'message')
    loadTemplate('../templates/messageAudio.html', 'requestVoiceMessage')
    loadTemplate('../templates/chatWindow.html', 'chatWindow')

}
function changeTheme() {
    const themeSelect = document.getElementById("themeSelect");
    console.log("hhhh");
    themeSelect.addEventListener("change", function () {
        const selectedTheme = themeSelect.value;
        if (selectedTheme === "dark") {
            const windows = document.querySelectorAll(".contentWindow");
            const container = document.querySelectorAll(".player-container");

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
    });
}

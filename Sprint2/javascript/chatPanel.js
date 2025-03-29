

function loadChats() {
    const container = document.getElementById("chatConversationContainer");
    container.innerHTML = '';
    for (let i = 0; i < contact.length; i++) {
        let li = document.createElement("li");
        let div = document.createElement("div");
        let id = contact[i];
        div.id = "voiceMessage" + id;

        div.onclick = function () {
            loadChatsWindow(id);
        };

        li.appendChild(div);
        container.appendChild(li);

        loadTemplate('../templates/messageAudio.html', `voiceMessage${id}`, () => {
            const profilePicture =  usersData[id].profilePhoto;
            document.getElementById(`voiceMessage${id}`).querySelector('.profilePic').src = profilePicture;
            initializeAudioPlayer(`#voiceMessage${id}`);
        });
    }
}

function loadProfilePhoto() {
    document.getElementById("profile-photo").src = usersData[myUser].profilePhoto;

}

function loadChatsForMobile() {
    const container = document.getElementById("chatConversationContainerForMobile");
    container.innerHTML = '';
    for (let i = 0; i < contact.length; i++) {
        let li = document.createElement("li");
        let div = document.createElement("div");
        let id = contact[i];
        div.id = "voiceMessageForMobile" + id;

        div.onclick = function () {
            loadChatsWindow(id);
        };

        li.appendChild(div);
        container.appendChild(li);

        loadTemplate('../templates/messageAudio.html', `voiceMessageForMobile${id}`, () => {
            const profilePicture= usersData[id].profilePhoto;
            document.getElementById(`voiceMessageForMobile${id}`).querySelector('.profilePic').src = profilePicture;
            initializeAudioPlayer(`#voiceMessageForMobile${id}`);
        });
    }
}
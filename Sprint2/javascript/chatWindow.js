

function loadChatsWindow(id) {
    const chats = usersData[myUser].chat[id];


    const container = document.getElementById("chatsWindowContainer");
    container.innerHTML = '';
    for (let i = 0; i < chats.length; i++) {
        const li = document.createElement("li");
        let div = document.createElement("div");
        let id = chatsData[chats[i]].userId;
        div.id = "voiceMessage" + "chat" + id +i;
        li.classList.add("chatMessagebox");
        if (id === myUser) {
            li.classList.add("myChatMessage")
        }
        li.appendChild(div);
        container.appendChild(li);

        loadTemplate('../templates/messageAudio.html', `voiceMessage${"chat" +id +i}`, () => {
            initializeAudioPlayer(`#voiceMessage${"chat" +id+i}`);
            document.getElementById(`voiceMessage${"chat" +id+i}`).querySelector('.profilePic').src=usersData[id].profilePhoto;
        });
    }
    switchWindow(5);
}


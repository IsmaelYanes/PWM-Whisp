async function loadUserPhoto(userID) {
    try {
        const response = await fetch(`http://localhost:3000/users/${userID}`);
        const user = await response.json();
        return user.profilePhoto;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
}

async function loadChats(userID){

    try {
        const response = await fetch(`http://localhost:3000/users/${userID}`);
        const user = await response.json();
        const contacts = user.contact;
        const container = document.getElementById("chatConversationContainer");
        container.innerHTML = '';

        for (let i = 0; i < contacts.length; i++) {
            let li = document.createElement("li");
            let div = document.createElement("div");
            let id = contacts[i];
            div.id = "voiceMessage" + id;
            li.appendChild(div);
            container.appendChild(li);
            loadTemplate('../templates/messageAudio.html', `voiceMessage${id}`);
            const userPhoto = await loadUserPhoto(id);
            const profilePic = document.getElementById(`voiceMessage${id}`).querySelector('.profilePic');
            if (profilePic) {
                profilePic.src = userPhoto;
            }
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

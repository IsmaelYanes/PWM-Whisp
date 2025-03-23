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

async function loadChats(){
    let userID = 0;
    try {
        const response = await fetch(`http://localhost:3000/users/${userID}`);
        const user = await response.json();
        const contacts = user.contact;
        const container = document.getElementById("chatConversationContainer");

        for (let i = 0; i < contacts.length; i++) {
            let li = document.createElement("li");
            let div = document.createElement("div");
            div.id = "voiceMessage" + i;
            li.appendChild(div);
            container.appendChild(li);
            loadTemplate('../templates/messageAudio.html', `voiceMessage${i}`);
            const userPhoto = await loadUserPhoto(contacts[i]);
            const profilePic = document.getElementById(`voiceMessage${i}`).querySelector('.profilePic');
            if (profilePic) {
                profilePic.src = userPhoto;
            }
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

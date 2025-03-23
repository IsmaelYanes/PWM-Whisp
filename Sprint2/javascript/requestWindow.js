

async function loadRequests(){
    let userID = 0;
    try {
        const response = await fetch(`http://localhost:3000/users/${userID}`);
        const user = await response.json();
        const requests = user.request;
        const container = document.getElementById("requestMessageContainer");

        for (let i = 0; i < requests.length; i++) {
            console.log(i)
            let li = document.createElement("li");
            let div = document.createElement("div");
            div.id = "requestVoiceMessage" + i;
            li.appendChild(div);
            container.appendChild(li);
            loadTemplate('../templates/voiceMailRequest.html', `requestVoiceMessage${i}`);
            const userPhoto = await loadUserPhoto(requests[i]);
            const profilePic = document.getElementById(`requestVoiceMessage${i}`).querySelector('.profilePic');
            if (profilePic) {
                profilePic.src = userPhoto;
            }
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

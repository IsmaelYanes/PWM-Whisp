function acceptContact(button) {
    const list = button.closest('li');
    list.remove();
    addContact(myUser, Number.parseInt(button.getAttribute('userid')))
        .then(() => {
            loadUsersData();
        })
        .then((response) => {
            loadChats();
        })
}

function rejectContact(button) {
    const list = button.closest('li');
    list.remove();
    removeContact(myUser, Number.parseInt(button.getAttribute('userid')))
        .catch(error => {
            console.error('Error al rechazar contacto:', error);
        });
}

function loadRequests() {
    const requests = usersData[myUser].request;
    const container = document.getElementById("requestMessageContainer");
    for (let i = 0; i < requests.length; i++) {
        let li = document.createElement("li");
        li.setAttribute('data-request-id', requests[i]);
        let div = document.createElement("div");
        div.id = "requestVoiceMessage" + i;
        li.appendChild(div);
        container.appendChild(li);
        loadTemplate('../templates/voiceMailRequest.html', `requestVoiceMessage${i}`, ()=>{
            initializeAudioPlayer(`#requestVoiceMessage${i}`);
            const acceptButton = document.getElementById(`requestVoiceMessage${i}`).querySelector('.acceptButton');
            const rejectButton = document.getElementById(`requestVoiceMessage${i}`).querySelector('.rejectButton');
            const profilePic = document.getElementById(`requestVoiceMessage${i}`).querySelector('.profilePic');
            acceptButton.setAttribute('userId', requests[i]);
            rejectButton.setAttribute('userId', requests[i]);
            profilePic.src = usersData[requests[i]].profilePhoto;
        });
    }
}


function addContact(userID, newContactID) {
    return fetch(`http://localhost:3000/users/${userID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(user => {
            if (!user.contact.includes(newContactID)) {
                user.contact.unshift(newContactID);
            }

            return fetch(`http://localhost:3000/users/${userID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contact: user.contact
                })
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function removeContact(userID, contactID) {
    return fetch(`http://localhost:3000/users/${userID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(user => {
            user.request = user.request.filter(contact => contact !== contactID);
            return fetch(`http://localhost:3000/users/${userID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    request: user.request
                })
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


let usersData;
let chatsData;
let contact;
let profilePicture;


async function loadUsersData(userId) {
    try {
        const response = await fetch('http://localhost:3000/users');
        usersData = await response.json();

        if (usersData[userId]) {
            contact = usersData[userId].contact;
            profilePicture = usersData[userId].profilePhoto;
        } else {
            console.error('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error en loadUsersData:', error);
    }
}

async function loadChatsData() {
    try {
        const response = await fetch('http://localhost:3000/chats');

        chatsData = await response.json();
    } catch (error) {
        console.error('Error en loadChatsData:', error);
    }
}

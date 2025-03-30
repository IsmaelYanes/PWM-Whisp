
let usersData;
let chatsData;
let contact;
let profilePicture;


async function loadUsersData(userId) {
    usersData = await fetch('http://localhost:3000/users').then(response => response.json());
    contact =  usersData[userId].contact;
    profilePicture =  usersData[userId].profilePhoto;
}

async function loadChatsData() {
    chatsData = await fetch('http://localhost:3000/chats').then(response => response.json());
}





let usersData;
let chatsData;
let contact;
let profilePicture;

async function loadUsersData(myUser) {
    usersData = await fetch('http://localhost:3000/users').then(response => response.json());
    contact = usersData[0].contact;
    profilePicture = usersData[0].profilePhoto;
}

async function loadChatsData() {
    chatsData = await fetch('http://localhost:3000/chats').then(response => response.json());
}

loadUsersData();
loadChatsData();


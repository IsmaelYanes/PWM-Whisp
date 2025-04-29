export interface User {
  id?: string,
  email: string;
  password?: string;  // solo para creación en auth, no se guarda en firestore
  name: string;
  birthday: string;
  imageProfile: string;
  contact: [];
  request: [];
  chat: {[key: string]: number[]}
}

import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5j-XGejYuKe2Nt-9VjHbaaDUHaVnqt58",
  authDomain: "nu-mindnet-client.firebaseapp.com",
  databaseURL: "https://nu-mindnet-client-default-rtdb.firebaseio.com/",
  projectId: "nu-mindnet-client",
  storageBucket: "nu-mindnet-client.appspot.com",
  messagingSenderId: "605914428803",
  appId: "1:605914428803:web:f5acf38c3aab5ba4dc32b6"
};

export const getFirebaseApp = () => {
  return !getApps().length ? initializeApp(firebaseConfig) : getApp();
};

export const getFirebaseDatabase = (firebase) => {
  return getDatabase(firebase);
};

export const getFirebaseStorage = (firebase) => {
  return getStorage(firebase);
};

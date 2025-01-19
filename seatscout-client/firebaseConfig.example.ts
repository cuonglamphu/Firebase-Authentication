import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithCredential,
    GoogleAuthProvider,
} from "firebase/auth";
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithCredential };

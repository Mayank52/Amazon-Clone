import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCVOF4-1VcivqlQZAfpYZ4Xm1h0326MarM",
  authDomain: "clone-dd417.firebaseapp.com",
  projectId: "clone-dd417",
  storageBucket: "clone-dd417.appspot.com",
  messagingSenderId: "410632104343",
  appId: "1:410632104343:web:fe0d92e7c9c2fa96b6bcd2",
});

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

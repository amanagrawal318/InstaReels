import firebase from "firebase";

  let firebaseConfig = {
    apiKey: "AIzaSyDdZfMH-pEfIgZI1tMDPyKV0_V3gD-I0lc",
    authDomain: "loginapp-1a5a2.firebaseapp.com",
    projectId: "loginapp-1a5a2",
    storageBucket: "loginapp-1a5a2.appspot.com",
    messagingSenderId: "685648566419",
    appId: "1:685648566419:web:5bb15ec97a885166e81566"
  };
  let firebaseApp = firebase.initializeApp(firebaseConfig);
  
export let firebaseAuth = firebaseApp.auth();
export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();
export let timeStamp = firebase.firestore.FieldValue.serverTimestamp;

var firebase = require('firebase/app').default;
require('firebase/firestore');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrnNBi1ptWYnqXA_cNZ9FXVBpZR1zn_54",
    authDomain: "translationeer.firebaseapp.com",
    databaseURL: "https://translationeer.firebaseio.com",
    projectId: "translationeer",
    storageBucket: "translationeer.appspot.com",
    messagingSenderId: "687257894798",
    appId: "1:687257894798:web:ddb3b3488208674438aedf",
    measurementId: "G-4QH2XWC56C"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const pFirestore = firebase.firestore();
  
export { pFirestore};
  
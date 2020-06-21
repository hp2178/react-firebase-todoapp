import firebase from 'firebase';

const DB_CONFIG = {
    apiKey: "AIzaSyDZONirfzTRZWOXtHZWhwdWGMXskSMefEI",
    authDomain: "mytodoapp-21667.firebaseapp.com",
    databaseURL: "https://mytodoapp-21667.firebaseio.com",
    projectId: "mytodoapp-21667",
    storageBucket: "mytodoapp-21667.appspot.com",
    messagingSenderId: "689022669123",
    appId: "1:689022669123:web:35fa8eece0eef632aa5ff6",
    measurementId: "G-EGK12ZD9ZZ"
  };

const Firebase = firebase.initializeApp(DB_CONFIG);

export default Firebase;
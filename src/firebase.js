// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

//The firebase call information, do not touch, do not look at, do not think about, do not do anything with this.
const firebaseConfig = {
    apiKey: "AIzaSyCYaaAfiVr0bk0dhapBFuAdVu-mXC43hkw",
    authDomain: "react-project3-blog.firebaseapp.com",
    databaseURL: "https://react-project3-blog-default-rtdb.firebaseio.com",
    projectId: "react-project3-blog",
    storageBucket: "react-project3-blog.appspot.com",
    messagingSenderId: "873298523533",
    appId: "1:873298523533:web:7289101b777b77f67f39c4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyBI-bxtR4HMCY-OZYTU_ErFw5bGp85JHJM",
   authDomain: "gongmoja-s.firebaseapp.com",
   databaseURL: "https://gongmoja-s.firebaseio.com",
   projectId: "gongmoja-s",
   storageBucket: "gongmoja-s.appspot.com",
   messagingSenderId: "366886069145",
   appId: "1:366886069145:web:b48eac27bfa58be0eae908",
   measurementId: "G-XDFSRY4DKZ",
};

firebase.initializeApp(firebaseConfig);

export const fireAuth = firebase.auth();
export const fireDatabase = firebase.database();
export const fireStorage = firebase.storage();

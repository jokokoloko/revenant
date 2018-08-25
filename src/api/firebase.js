import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { SLUGS, USERS, POSTS } from '../js/data';

const config = {
    apiKey: 'AIzaSyA17iumwKDJZPuzGOzK_giK2RD1rb5nhGE',
    authDomain: 'revenant-cb783.firebaseapp.com',
    databaseURL: 'https://revenant-cb783.firebaseio.com',
    projectId: 'revenant-cb783',
    storageBucket: 'revenant-cb783.appspot.com',
    messagingSenderId: '64271569483',
};
firebase.initializeApp(config);

export const authentication = firebase.auth();
export const firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true }; // Patch for Date error (possibly only necessary while in beta)
firestore.settings(settings); // Currently only needed for the patch above

export const slugs = firestore.collection(SLUGS);
export const users = firestore.collection(USERS);
export const posts = firestore.collection(POSTS);

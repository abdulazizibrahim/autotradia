import firebase from'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyB14OYC6iIVADGONzyVNH_AmmD2EUsav7w",
    authDomain: "auto-tradia.firebaseapp.com",
    databaseURL: "https://auto-tradia.firebaseio.com",
    projectId: "auto-tradia",
    storageBucket: "auto-tradia.appspot.com",
    messagingSenderId: "69509284477",
    appId: "1:69509284477:web:f9535f2e33ce1bdcbda714"
};
export const getUserData = async(user) =>{
  const data = []
  console.log(user);
  firestore.collection(`users/${user.currentUser.id}/ads`).get().then(
   snapShot => {
     snapShot.forEach(doc => { 
       data.push(doc.data())
     })
   }
 )
 console.log(data);
 return data;
}
export const createUserProfileDocument = async (userAuth, additionalData) =>{
  if(!userAuth) return ;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get(); 
  console.log(snapShot);

  if(!snapShot.exists)
  {
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try{
           await userRef.set({displayName, email, createdAt, ...additionalData})
      }
      catch(error)
      {
          console.log('error exists creating user', error.message());
      }
  }

  return userRef;
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
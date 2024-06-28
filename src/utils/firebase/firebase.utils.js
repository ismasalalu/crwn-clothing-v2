import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-c4-QEWa0W6quloVKj4kq5Lumqz7nQZ0",
    authDomain: "crwn-db-7ec5c.firebaseapp.com",
    projectId: "crwn-db-7ec5c",
    storageBucket: "crwn-db-7ec5c.appspot.com",
    messagingSenderId: "554579765690",
    appId: "1:554579765690:web:20d97d1f771dcb89029583",
    measurementId: "G-87740VFF5E"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(firebaseApp);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef); // to check if the instance is exist in the database

    console.log(userSnapShot);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.error('Error creating user document', error);
        }
    }

    //if user data not exist
    //create / set document with data on the database

    //if it exist
    //return the userDocRef

    return userDocRef;
};

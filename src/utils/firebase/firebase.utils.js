import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase, signInWithEmailAndPassword } from 'firebase/auth';
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

export const createUserDocumentFromAuth = async (userAuth, additionValue) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt, 
                ...additionValue
            });
        } catch (error) {
            console.error('Error creating user document', error);
        }
    }

    return userDocRef;
};


export const createUserWithEmailAndPasswordCustom = async (user, password) => {
    if(!user || !password) return;

    return await createUserWithEmailAndPasswordFirebase(auth, user, password);
}


export const signInAuthWithEmailAndPassword = async (user, password) => {
    if(!user || !password) return;

    return await signInWithEmailAndPassword(auth, user, password);
}
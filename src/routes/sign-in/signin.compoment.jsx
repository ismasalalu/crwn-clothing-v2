import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const loginGoogleUser = async () => {
        try {
            const {user} = await signInWithGooglePopup();
            const userDocRef = await createUserDocumentFromAuth(user);
        } catch (error) {
            console.error('Error signing in with Google', error);
        }
    };

    return (
        <div>
            <h1>This Is SignIn</h1>    
            <button onClick={loginGoogleUser}>
                Sign-In with PopUps    
            </button>        
        </div>
    );
};

export default SignIn;

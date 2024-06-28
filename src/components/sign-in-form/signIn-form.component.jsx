import React, { useState } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import InputForm from '../input-form/input-form.component';
import Button from "../button/button.component";

import './sign-in.style.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFeild = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        try {
            const { user } = await signInWithGooglePopup();
            await createUserDocumentFromAuth(user);
        } catch (error) {
            console.error('Error signing in with Google', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const responce = await signInAuthWithEmailAndPassword(email, password);
            console.log(responce);
        }
        catch(error){
            if(error.code == "auth/invalid-credential"){
                alert("Incorect Username / Password");
            }else{
                console.log(error);
            }
        }
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign In with Email And Password</span>
            <form onSubmit={handleSubmit}>
                <InputForm 
                    label='Email'
                    required 
                    type="email" 
                    onChange={handleChange} 
                    name='email' 
                    value={email} 
                />

                <InputForm 
                    label='Password'
                    required 
                    type="password" 
                    onChange={handleChange} 
                    name='password' 
                    value={password} 
                />

                <div className='button-container'>
                    <Button type="submit">Sign Up</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign-In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;

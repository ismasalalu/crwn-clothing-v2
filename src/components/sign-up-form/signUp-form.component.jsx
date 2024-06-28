import React, { useState } from 'react';
import { createUserWithEmailAndPasswordCustom, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import InputForm from '../input-form/input-form.component';
import Button from "../button/button.component";

import './sign-up.style.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFeild = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Password not match");
            return;
        }

        try{
            const {user} = await createUserWithEmailAndPasswordCustom(email, password); // kata n firebase yang tok adalah account
            await createUserDocumentFromAuth(user, {displayName}); // pasya simpan data ya dlm datastore
            resetFeild(); // lasty, clear kan tempat isik maklumat ya
        }
        catch(error){
            if(error.code === "auth/email-already-in-use"){
                alert("Email allready in use");
            }else{
                console.error(error);
            }
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>Dont't have an account?</h2>
            <span>Sign Up with Email And Password</span>
            <form onSubmit={handleSubmit}>
                <InputForm 
                    label='Display Name'
                    required 
                    type="text" 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName} 
                />

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

                <InputForm 
                    label='Confirm Password'
                    required 
                    type="password" 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword} 
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUp;

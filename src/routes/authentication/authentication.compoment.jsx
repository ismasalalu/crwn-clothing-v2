import React from 'react';
import SignUp from '../../components/sign-up-form/signUp-form.component';
import SignIn from '../../components/sign-in-form/signIn-form.component';

import './authentication.style.scss';

const Authentication = () => {
    return (
        <div className='authentication-container'>
            <SignIn />
            <SignUp />
        </div>
    );
};

export default Authentication;

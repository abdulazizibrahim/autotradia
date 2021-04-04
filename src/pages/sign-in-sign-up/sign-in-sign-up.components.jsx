import React from 'react';
import './sign-in-sign-up.styles.scss';
import SignIn from '../../components/sign-in/sign-in.components';
import SignUp from '../../components/sign-up/sign-up.components';
const SignInAndSignOutPage = () => (
    <div className = 'sign-in-sign-out'>
        <SignIn/>
        <SignUp/>
    </div>
);
export default SignInAndSignOutPage;
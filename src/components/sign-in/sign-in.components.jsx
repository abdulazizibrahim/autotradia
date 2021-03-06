import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.components'
import {signInWithGoogle, auth} from '../../firebase/firebase.utils'
import GoogleButton from 'react-google-button';
class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            email : '',
            password : ''
        }
    }

    handleSubmit = async event =>{
        event.preventDefault();
        const {email, password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email : '', password : ''});
        } catch (error) {
            console.log(error);   
        }
    
    }

    handleChange = event =>{
        const { value, name } = event.target;
        this.setState({[name] : value})
    }

    render(){
        return(
            <div className = 'sign-in'>
                <h2 className='h2s'>I already have an account</h2>
                <span>Sign In with your email and password</span>

                <form onSubmit ={this.handleSubmit}>
                    <FormInput  name='email' type="email" value = {this.state.email} label = 'email' handleChange={this.handleChange} required/>
                    <FormInput  name='password' type="password" value = {this.state.password}  label = 'password'handleChange={this.handleChange} required/>
                    <div className = 'buttons'>
                        <CustomButton type="submit" >SIGN IN</CustomButton>
                        <GoogleButton onClick = {signInWithGoogle}/>
                    </div>
                   
                </form>
            </div>
        );
    }

    
}
export default SignIn;
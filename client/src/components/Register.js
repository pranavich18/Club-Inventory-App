import Navbar from './Navbar';
import React, {useState} from 'react';
import {signup} from '../helpers/authentication';
import { Redirect } from 'react-router';

export default function Register(){
    const [firstName, setfName] = useState('');
    const [lastName, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [redirect, setRedirect] = useState(false);

    function registerUser(e){
        e.preventDefault();
        const data = {
            firstName: firstName,
            lastName: lastName,
            email:  email,
            password: password
        }
        signup(data).then((response) => {
            console.log(response);
            if(response.code){
                console.log("Success");
                setRedirect(true);
            }
            else{
                setRedirect(false);
                console.log(response.message);
            }
        });
    }

    if(!redirect){
        return(
            <div>
                <Navbar />
                <form noValidate onSubmit = {(e) => registerUser(e)}>
                    <h3>Register</h3>
    
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" noValidate value={firstName} onChange = {(e) =>setfName(e.target.value)} />
                    </div>
    
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" noValidate value={lastName} onChange = {(e) => setlName(e.target.value)}/>
                    </div>
    
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" noValidate value={email} onChange = {(e) =>setEmail(e.target.value)}/>
                    </div>
    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" noValidate value={password} onChange = {(e) =>setPassword(e.target.value)}/>
                    </div>
    
                    <button className=" form-button btn btn-dark btn-lg btn-block">Register</button>
                </form>
            </div>
        );
    }
    else{
        return(
            <Redirect to="/sign-in"/>
        );
    }
}
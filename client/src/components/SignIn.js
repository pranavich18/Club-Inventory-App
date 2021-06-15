import Navbar from './Navbar'
import React, {useState} from 'react'
import {login} from '../helpers/authentication'
import { Redirect } from 'react-router'
import {Modal} from 'react-bootstrap'



export default function SignIn(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [role, setRole] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleCloseAlert = () => setShowAlert(false);
    const handleShowAlert = () => setShowAlert(true);


    function signInUser(e) {
        e.preventDefault();
        login(email, password).then( (response) => {
            console.log(response);
            if(response.code){
                console.log("Success");
                if(response.data.user && response.data.user.role){
                    setRole(response.data.user.role);
                }
                setRedirect(true);
            }
            else{
                console.log(response.message);
                setEmail('');
                setPassword('');
                handleShowAlert();
            }
        });
    }

    if(!redirect){
        return(
            <div>
                <Modal size="md" show={showAlert} onHide={handleCloseAlert}>
                    <Modal.Header className="justify-content-end" closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        Invalid Email or Password !!                  
                    </Modal.Body>
                </Modal>
                <Navbar />
                <form noValidate onSubmit = {(e) => signInUser(e) }>
    
                    <h3>Log in</h3>
    
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" noValidate value = {email} onChange = {(e)=> setEmail(e.target.value)} />
                    </div>
    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" placeholder="Enter password" noValidate value = {password} onChange = {(e)=> setPassword(e.target.value)} />
                    </div>
    
                    <button type="submit" className="form-button btn btn-dark btn-lg btn-block">Sign in</button>
                </form>
            </div>
        );
    }
    else{
        var link = "/dashboard/" + role;
        return <Redirect to = {link} />;
    }
}
import {useState, useEffect} from 'react'
import {getUserDashboard, logout} from '../../helpers/user'
import { Redirect } from 'react-router'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'


export default function User() {

    const [loggedIn, setLoggedIn] = useState(true);
    const [user, setUser] = useState({});

    useEffect(()=>{
        getUserDashboard().then((response)=>{
            console.log(response);
            if(response.code){
                console.log("Success");
                setUser(response.data.user);
            } 
            else{
                setLoggedIn(false);
                console.log("Failed, login again!!");
            }
        });
    },[]);

    function logOutUser(e){
        logout().then((response)=>{
            console.log(response);
            setLoggedIn(false);
            if(response.code){
                console.log("User Logged Out successfully!!");
            }
            else{
                console.log("Token Expired!!");
            }
        });
    }

    if(loggedIn){
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand >User Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav>
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            { user &&
                                <NavDropdown.Item >{'Welcome ' + user.name +' !!'} </NavDropdown.Item>
                            }
                            <NavDropdown.Divider />
                            { user &&
                                <NavDropdown.Item >{'Email- ' + user.email}</NavDropdown.Item>
                            }
                            <NavDropdown.Divider />
                            <NavDropdown.Item variant="dark" action onClick = {(e) => logOutUser(e)}>LogOut</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
            </div>
        );
    }
    else{
        return <Redirect to="/" />
    }
}
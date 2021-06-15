import '../App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
  

export default function Navbar(){

    return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <span class="navbar-brand" >Inventory App</span>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo01">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link" to="/sign-in">Log In</Link>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
    );
}
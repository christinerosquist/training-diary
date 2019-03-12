import React, {Component} from 'react';
import './Navbar.css'
import {Link} from "react-router-dom";

class Navbar extends Component {

    logOut = () => {
        fetch('/api/logOut', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(() => {
                this.props.handleLogout()
                console.log("Changed to '' ")
            }) // set userId to '' in App, so that all pages will be redirected when not logged in
            .catch()
        return "/"
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to={"/profile/"+this.props.userId}>Profile</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/feed">Feed</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addworkout">Add new workout</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addprogress">Add new progress</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/' onClick={this.logOut}>Log out</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="searchField"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" id="searchBtn">Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {};

export default Navbar;

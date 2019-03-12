import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import AddProgress from "../../Components/AddProgress/AddProgress";
import {Redirect} from "react-router-dom";

class AddProgressPage extends Component {
    render() {
        if (this.props.userId === '') {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <Header/>
                <div id="navbarDiv">
                    <Navbar userId={this.props.userId} handleLogout={this.props.handleLogout}/>
                </div>
                <div className="container appContainer">
                    <AddProgress/>
                </div>
            </div>
        );
    }
}

export default AddProgressPage;

import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Feed from "../../Components/Feed/Feed";
import {Redirect} from "react-router-dom";

class FeedPage extends Component {

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
                    <Feed/>
                </div>
            </div>
        );
    }
}

export default FeedPage;

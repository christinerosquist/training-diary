import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Feed from "../../Components/Feed/Feed";
import {Redirect} from "react-router-dom";

class FeedPage extends Component {

    componentDidMount() {
        fetch('/api/getCurrentUser')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.props.handleLogin(data.user_id) // either userId or ''
            })
            .catch(error => console.log(error))
    }

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
                    <Feed handleLogin={this.handleLogin}/>
                </div>
            </div>
        );
    }
}

export default FeedPage;

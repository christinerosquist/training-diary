import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Feed from "../../Components/Feed/Feed";

class FeedPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div id="navbarDiv">
                    <Navbar/>
                </div>
                <div className="container appContainer">
                    <Feed/>
                </div>
            </div>
        );
    }
}

export default FeedPage;

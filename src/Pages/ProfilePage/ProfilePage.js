import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div id="navbarDiv">
                    <Navbar/>
                </div>
                <div className="container appContainer">
                    hej
                </div>
            </div>
        );
    }
}

ProfilePage.propTypes = {};

export default ProfilePage;

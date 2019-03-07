import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import Progress from "../../Components/Progress/Progress";
import Diary from "../../Components/Diary/Diary";

class ProfilePage extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <Header/>
                <div id="navbarDiv">
                    <Navbar/>
                </div>
                <div className="container appContainer">
                    <ProfileHeader/>
                    <Progress/>
                    <Diary user_id={this.props.params.id}/>
                </div>
            </div>
        );
    }
}


export default ProfilePage;

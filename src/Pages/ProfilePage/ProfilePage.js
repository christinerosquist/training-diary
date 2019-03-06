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

    componentDidMount() {
        console.log(this.props.params.id)
        fetch('/api/profile/' + this.props.params.id)
            .then(res => res.json())
            .then(data => console.log(data))
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
                    <Diary/>
                </div>
            </div>
        );
    }
}


export default ProfilePage;

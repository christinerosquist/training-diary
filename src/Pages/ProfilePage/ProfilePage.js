import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import Progress from "../../Components/Progress/Progress";
import Diary from "../../Components/Diary/Diary";

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id : this.props.params.id,
        }
    }

    componentDidMount() {
        this.setState({id:this.props.params.id})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({id:nextProps.params.id})
    }

    render() {
        return (
            <div>
                <Header/>
                <div id="navbarDiv">
                    <Navbar userId={this.props.userId}/>
                </div>
                <div className="container appContainer">
                    <ProfileHeader userId={this.state.id}/>
                    <Progress userId={this.state.id}/>
                    <Diary userId={this.state.id}/>
                </div>
            </div>
        );
    }
}


export default ProfilePage;

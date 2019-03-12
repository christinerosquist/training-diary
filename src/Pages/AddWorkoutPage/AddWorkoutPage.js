import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import AddWorkout from "../../Components/AddWorkout/AddWorkout";
import {Redirect} from "react-router-dom";

class AddWorkoutPage extends Component {
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
                    <AddWorkout userId={this.props.userId}/>
                </div>
            </div>
        );
    }
}

export default AddWorkoutPage;

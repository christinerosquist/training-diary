import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import AddWorkout from "../../Components/AddWorkout/AddWorkout";

class AddWorkoutPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div id="navbarDiv">
                    <Navbar userId={this.props.userId} />
                </div>
                <div className="container appContainer">
                    <AddWorkout/>
                </div>
            </div>
        );
    }
}

export default AddWorkoutPage;

import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import AddProgress from "../../Components/AddProgress/AddProgress";

class AddProgressPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div id="navbarDiv">
                    <Navbar userId={this.props.userId} />
                </div>
                <div className="container appContainer">
                    <AddProgress/>
                </div>
            </div>
        );
    }
}

export default AddProgressPage;

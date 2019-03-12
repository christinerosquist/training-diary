import React, {Component} from 'react';
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Search from "../../Components/Search/Search";



class SearchPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div id="navbarDiv">
                    <Navbar userId={this.props.userId} />
                </div>
                <div className="container appContainer">
                    <Search userId={this.props.userId} location={this.props.params}/>
                </div>
            </div>
        );
    }
}


export default SearchPage;

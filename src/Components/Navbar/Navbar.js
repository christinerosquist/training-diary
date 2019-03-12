import React, {Component} from 'react';
import './Navbar.css'
import {Link} from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchValue: '',
            redirect: false,
            search:false,
            searchRes:''
        }

        this.handleSearchValue = this.handleSearchValue.bind(this);
        this.handleSubmitBtn = this.handleSubmitBtn.bind(this);

    }

    handleSearchValue(event) {
        this.setState({
            searchValue: event.target.value,
        })
    }

    search(searchValue){
        fetch('/api/search/' + searchValue)
            .then(res => res.json())
            .then(data => {
                console.log("Searched for: " + data.users[0].userInfo.name)
                this.setState({searchRes: data.users, search:true})
            })
            .catch(error => console.log(error))

    }

    handleSubmitBtn(){
        if(this.state.searchValue !== '') {
            this.search(this.state.searchValue);
        }
    }

    logOut = () => {
        fetch('/api/logOut', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(() => {
                this.props.handleLogout()
                console.log("Changed to '' ")
            }) // set userId to '' in App, so that all pages will be redirected when not logged in
            .catch()
        return "/"
    }

    handleForm(e){
        e.preventDefault();
    }


    render() {
        console.log(this.props.userId)
        if(this.state.search){
            return <Redirect to={{ pathname:'/search', state: {searchRes: this.state.searchRes}}}/>;
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to={"/profile/"+this.props.userId}>Profile</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/feed">Feed</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addworkout">Add new workout</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addprogress">Add new progress</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/' onClick={this.logOut}>Log out</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={this.handleForm}>
                        <input className="form-control mr-sm-2" type="search"  value={this.state.searchValue} onChange={this.handleSearchValue} placeholder="Search" aria-label="Search" id="searchField"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit"  onClick={this.handleSubmitBtn }  id="searchBtn">Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {};

export default Navbar;

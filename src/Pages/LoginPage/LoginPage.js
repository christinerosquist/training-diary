import React, {Component} from 'react';
import Login from "../../Components/Login/Login";
import {Redirect} from "react-router-dom";

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        fetch('/api/getCurrentUser')
            .then(res => res.json())
            .then(data => {
                if(data.user_id !== ''){ // if logged in, redirect user to feed
                    console.log(data.user_id)
                    this.props.handleLogin(data.user_id)
                    this.setState({ redirect:true })
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/feed'/>
        }
        return (
            <div>
                <Login handleLogin={this.props.handleLogin}/>
            </div>
        );
    }
}
export default LoginPage;

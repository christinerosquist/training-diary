import React, {Component} from 'react';
import './Login.css'
import Redirect from "react-router-dom/es/Redirect";
import {Link} from "react-router-dom";
import moment from "moment/moment";


class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            redirect: false,
            wrongPassword: false
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmitBtn = this.handleSubmitBtn.bind(this);
        this.handleForm = this.handleForm.bind(this);

    }

    validateUser(email, password){

        fetch('/api/validateuser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(body => {
                console.log(body)
                if (body.user !== "Invalid") {
                    this.props.handleLogin(body.user.id)
                    this.setState({ redirect: true, wrongPassword: false });
                } else {
                    this.setState({wrongPassword:true});
                }
            })
            .catch(e => console.log(e))
    }

    handleEmail(event) {
        this.setState({
            email: event.target.value,
        })
    }

    handlePassword(event) {
        this.setState({
            password: event.target.value,
        })
    }

    handleSubmitBtn() {
        if(this.state.email === '' || this.state.password === ''){
            this.setState({wrongPassword:true});

        } else{
            this.validateUser(this.state.email, this.state.password)
        }
    }

    handleForm(e){
            e.preventDefault();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/feed'/>
        }
        return (
            <div>
                <div className="container" id="loginContainer">
                    <h3 id="loginHeader">LOGIN</h3>
                    <form onSubmit={this.handleForm}>
                        <div className="form-group">
                            <label >Email address</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={this.handleEmail} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={this.handlePassword} id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        {this.state.wrongPassword && <p id='wrongPasswordId'>Could not log in, please check your email or password.</p>}
                        <button type="submit" onClick={this.handleSubmitBtn } className="btn btn-primary">Submit</button>
                    </form>
                    <Link to="/createUser"> <button type="submit" onClick={this.handleSubmitBtn} className="btn btn-primary" id="signUpBtn"> Sign Up</button></Link>
                </div>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;
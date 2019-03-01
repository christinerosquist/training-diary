import React, {Component} from 'react';
import './Login.css'

class Login extends Component {
    render() {
        return (
            <div>
                <div className="container" id="loginContainer">
                    <h3 id="loginHeader">LOGIN</h3>
                    <form>
                        <div className="form-group">
                            <label >Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;

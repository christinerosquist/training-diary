import React, {Component} from 'react';
import './Login.css'

class Login extends Component {
    render() {
        return (
            <div>
                <div className="container" id="loginContainer">
                    <h3 id="loginHeader">LOGIN</h3>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;

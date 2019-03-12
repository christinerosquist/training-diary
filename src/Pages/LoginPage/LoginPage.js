import React, {Component} from 'react';
import Login from "../../Components/Login/Login";

class LoginPage extends Component {
    render() {
        return (
            <div>
                <Login handleLogin={this.props.handleLogin}/>
            </div>
        );
    }
}
export default LoginPage;

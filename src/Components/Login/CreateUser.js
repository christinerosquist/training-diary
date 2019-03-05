import React, {Component} from 'react';


class CreateUser extends Component {
    render() {
        return (
            <div>
                <div className="container" id="loginContainer">
                    <h3 id="loginHeader">CREATE USER</h3>
                    <form>
                        <div className="form-group">
                            <label>User name</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="name" className="form-control" id="exampleInputPassword1" placeholder="Name"/>
                        </div>
                        <div className="form-group">
                            <label >Sex</label>
                            <select>
                                <option value="volvo">Female</option>
                                <option value="saab">Male</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Height</label>
                            <input type="Height" className="form-control" id="exampleInputPassword1" placeholder="Height"/>
                        </div>
                        <div className="form-group">
                            <label >Weight</label>
                            <input type="name" className="form-control" id="exampleInputPassword1" placeholder="Weight"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateUser;

import React, {Component} from 'react';
import Redirect from "react-router-dom/es/Redirect";
import {Link} from "react-router-dom";
import moment from "moment/moment";

class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: '',
            sex: 'Female', //By default
            height: '',
            weight:'',
            muscle: '',
            redirect: false,
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSex = this.handleSex.bind(this);
        this.handleHeight = this.handleHeight.bind(this);
        this.handleWeight = this.handleWeight.bind(this);

        this.handleSubmitBtn = this.handleSubmitBtn.bind(this);
        this.handleForm = this.handleForm.bind(this);

    }

    componentDidMount(){
        this.setState({redirect: false})
    }

    createUser = (email, password, name, sex, height, weight, muscle) => {
        fetch('/api/createuser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                sex: sex,
                height: height,
                weight: weight,
                muscle: muscle,
                date: moment(new Date()).format("YYYY-MM-DD")
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log("DONE!")
                this.setState({redirect: true})
            })
            .catch(error => console.log(error))
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

    handleName(event) {
        this.setState({
            name: event.target.value,
        })
    }

    handleSex(event) {
        this.setState({
            sex: event.target.value,
        })
    }

    handleHeight(event) {
        this.setState({
            height: event.target.value,
        })
    }

    handleWeight(event) {
        this.setState({
            weight: event.target.value,
        })
    }

    handleMuscle = (event) => {
        this.setState({
            muscle: event.target.value,
        })
    }

    handleSubmitBtn() { //Hantera bättre ifall man skickar tomma fält?
        this.createUser(this.state.email, this.state.password, this.state.name, this.state.sex, this.state.height, this.state.weight, this.state.muscle)
    }

    handleForm(e){
        e.preventDefault();
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className="container" id="loginContainer">
                    <h3 id="loginHeader">CREATE USER</h3>
                    <form onSubmit={this.handleForm}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={this.state.email} onChange={this.handleEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={this.state.password} onChange={this.handlePassword} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="name" value={this.state.name} onChange={this.handleName} className="form-control" id="exampleInputName1" placeholder="Name"/>
                        </div>
                        <div className="form-group">
                            <label>Sex</label>
                            <select value={this.state.sex} onChange={this.handleSex}>
                                <option>Female</option>
                                <option>Male</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Height</label>
                            <input value={this.state.height} onChange={this.handleHeight} type="Height" className="form-control" id="exampleInputHeight1" placeholder="Height"/>
                        </div>
                        <div className="form-group">
                            <label >Weight</label>
                            <input value={this.state.weight} onChange={this.handleWeight} type="name" className="form-control" id="exampleInputWeight1" placeholder="Weight"/>
                        </div>
                        <div className="form-group">
                            <label >Muscle percent</label>
                            <input value={this.state.muscle} onChange={this.handleMuscle} type="name" className="form-control" id="exampleInputMuscle1" placeholder="Muscle"/>
                        </div>
                        <button onClick={this.handleSubmitBtn} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <Link to="/"> <button type="submit" className="btn btn-primary" id="signUpBtn"> Back to login</button></Link>
                </div>
            </div>
        );
    }
}

CreateUser.propTypes = {};

export default CreateUser;

import React, {Component} from 'react';
import Redirect from "react-router-dom/es/Redirect";
import { Link } from "react-router-dom";
import * as config from '../../config.js'
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
            selectedFile: null,
            loading: false,
            error: false
        }
    }

    componentDidMount(){
        this.setState({redirect: false})
    }

    createUser = (email, password) => {
        fetch('/api/createuser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then(res => res.json())
            .then(data => {
                if(data.success === true) {
                    fetch('https://api.imgur.com/3/image/', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Client-ID ${config.client}`
                        },
                        body: this.state.selectedFile
                    })
                        .then(res => res.json())
                        .then(img => {
                            this.createuserinfo(data.id, this.state.name, this.state.sex, this.state.height, this.state.weight, this.state.muscle, img.data.link, img.data.deletehash)
                        })
                        .catch(e => console.log(e))

                    this.setState({redirect: true, loading: false, error: false})
                } else {
                    this.setState({loading: false, error: true})
                }
            })
            .catch(error => console.log(error))
    }

    createuserinfo = (id, name, sex, height, weight, muscle, link, deletehash) => {
        if(muscle > 100){
            muscle = 100
        }
        if(muscle < 0){
            muscle = 0
        }
        if(weight < 0){
            weight = 0
        }
        if(height < 0) {
            height = 0
        }

        fetch('/api/createuserinfo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                name: name,
                sex: sex,
                date: moment(new Date()).format("YYYY-MM-DD"),
                height: height,
                weight: weight,
                muscle: muscle,
                link: link,
                deletehash: deletehash
            })
        })
            .then(res => res.json())
            .then(data => console.log("Done"))
            .catch(e => console.log(e))
    }

    handleFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    handleSex = (event) => {
        this.setState({
            sex: event.target.value,
        })
    }

    handleHeight = (event) => {
        this.setState({
            height: event.target.value,
        })
    }

    handleWeight = (event) => {
        this.setState({
            weight: event.target.value,
        })
    }

    handleMuscle = (event) => {
        this.setState({
            muscle: event.target.value,
        })
    }

    // deletehash is if we want to delete the image from imgur. You do this with https://api.imgur.com/3/image/{id}, where {id} is the deletehash.
    handleSubmitBtn = () => {
        this.setState({loading: true})
        this.createUser(this.state.email, this.state.password)

    }

    handleForm = (e) => {
        e.preventDefault();
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }

        const { email, password, name, sex, height, muscle} = this.state;
        return (
            <div>
                <div className="container" id="loginContainer">
                    {this.state.loading && "LOADING!"}
                    {!this.state.loading &&
                    <div>
                        <h3 id="loginHeader">CREATE USER</h3>
                        <form onSubmit={this.handleForm}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" value={this.state.email} onChange={this.handleEmail}
                                       className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                       placeholder="Enter email"/>
                                {this.state.error && <div style={{color: 'red'}}>Email is already in use.</div>}
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" value={this.state.password} onChange={this.handlePassword}
                                       className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={this.state.name} onChange={this.handleName}
                                       className="form-control" id="exampleInputName1" placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <label>Profile picture</label>
                                <input type="file" onChange={this.handleFileChange}/>
                            </div>
                            <div className="form-group">
                                <label>Sex</label>
                                <select value={this.state.sex} onChange={this.handleSex}>
                                    <option>Female</option>
                                    <option>Male</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Height</label>
                                <input value={this.state.height} onChange={this.handleHeight} type="number"
                                       className="form-control" id="exampleInputHeight1" placeholder="Height"/>
                            </div>
                            <div className="form-group">
                                <label>Weight</label>
                                <input value={this.state.weight} onChange={this.handleWeight} type="number"
                                       className="form-control" id="exampleInputWeight1" placeholder="Weight"/>
                            </div>
                            <div className="form-group">
                                <label>Muscle percent</label>
                                <input min="0" max="100" value={this.state.muscle} onChange={this.handleMuscle} type="number"
                                       className="form-control" id="exampleInputMuscle1" placeholder="Muscle"/>
                            </div>
                            <button onClick={this.handleSubmitBtn}
                                    disabled={email === '' || password === '' || name === '' || sex === '' || height === '' || muscle === ''}
                                    type="submit" className="btn btn-primary">Submit
                            </button>
                        </form>
                        <Link to="/">
                            <button type="submit" className="btn btn-primary" id="signUpBtn"> Back to login</button>
                        </Link>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default CreateUser;

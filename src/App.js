import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'
import LoginPage from "./Pages/LoginPage/LoginPage"
import FeedPage from "./Pages/FeedPage/FeedPage"
import ProfilePage from "./Pages/ProfilePage/ProfilePage"
import AddWorkoutPage from "./Pages/AddWorkoutPage/AddWorkoutPage"
import AddProgressPage from "./Pages/AddProgressPage/AddProgressPage"
import CreateUserPage from "./Pages/LoginPage/CreateUserPage";

class App extends Component {
    state = {
        data: null,
        userId: ''
    }

    componentDidMount() {

    }

    handleLogin = (userId) => {
        console.log("Handle login: ", userId)
        this.setState({userId:userId})
        console.log(this.state.userId)
    }

    callBackendAPI = async () => {
        const response = await fetch('/api/testconnection')
        const body = await response.json()

        if(response.status !== 200){
            throw Error(body.message)
        }
        return body
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' render={(props) => <LoginPage/>}/>
                        <Route path='/createuser' render={() => <CreateUserPage />}/>
                        <Route path='/feed' render={() => <FeedPage userId={this.state.userId} handleLogin={this.handleLogin} />}/>
                        <Route path='/profile/:id' render={({location, match}) => <ProfilePage params={match.params} userId={this.state.userId}/>}/>
                        <Route path='/addworkout' render={(props) => <AddWorkoutPage userId={this.state.userId}/>}/>
                        <Route path='/addprogress' render={(props) => <AddProgressPage userId={this.state.userId}/>}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App

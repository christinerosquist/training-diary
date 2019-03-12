import React, {Component} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import './App.css'
import LoginPage from "./Pages/LoginPage/LoginPage"
import FeedPage from "./Pages/FeedPage/FeedPage"
import ProfilePage from "./Pages/ProfilePage/ProfilePage"
import AddWorkoutPage from "./Pages/AddWorkoutPage/AddWorkoutPage"
import AddProgressPage from "./Pages/AddProgressPage/AddProgressPage"
import CreateUserPage from "./Pages/LoginPage/CreateUserPage";
import SearchPage from "./Pages/SearchPage/SearchPage";

class App extends Component {
    constructor() {
        super()

        this.state = {
            data: null,
            userId: '',
        }
    }

    handleLogin = (userId) => {
        this.setState({userId:userId})
    }

    handleLogout = () => {
        this.setState({userId: ''})
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' render={(props) => <LoginPage handleLogin={this.handleLogin}/>}/>
                        <Route path='/createuser' render={() => <CreateUserPage />}/>
<<<<<<< HEAD
                        <Route path='/feed' render={() => <FeedPage userId={this.state.userId} handleLogout={this.handleLogout} handleLogin={this.handleLogin}/>}/>
                        <Route path='/profile/:id' render={({location, match}) => <ProfilePage params={match.params} userId={this.state.userId} handleLogout={this.handleLogout} handleLogin={this.handleLogin}/>}/>
                        <Route path='/addworkout' render={(props) => <AddWorkoutPage userId={this.state.userId} handleLogout={this.handleLogout} handleLogin={this.handleLogin}/>}/>
                        <Route path='/addprogress' render={(props) => <AddProgressPage userId={this.state.userId} handleLogout={this.handleLogout} handleLogin={this.handleLogin}/>}/>
=======
                        <Route path='/feed' render={() => <FeedPage userId={this.state.userId} handleLogin={this.handleLogin} />}/>
                        <Route path='/profile/:id' render={({location, match}) => <ProfilePage params={match.params} userId={this.state.userId}/>}/>
                        <Route path='/addworkout' render={(props) => <AddWorkoutPage userId={this.state.userId}/>}/>
                        <Route path='/addprogress' render={(props) => <AddProgressPage userId={this.state.userId}/>}/>
                        <Route path='/search' render={(props) => <SearchPage userId={this.state.userId}/>}/>
>>>>>>> 033791a4c8cfe38900221f23c7ffb64a888f14e5
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App

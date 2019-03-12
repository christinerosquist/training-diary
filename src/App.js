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
        userId: '',
    }

    componentDidMount() {
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
                        <Route path='/feed' render={() => <FeedPage userId={this.state.userId} handleLogout={this.handleLogout} />}/>
                        <Route path='/profile/:id' render={({location, match}) => <ProfilePage params={match.params} userId={this.state.userId} handleLogout={this.handleLogout}/>}/>
                        <Route path='/addworkout' render={(props) => <AddWorkoutPage userId={this.state.userId} handleLogout={this.handleLogout}/>}/>
                        <Route path='/addprogress' render={(props) => <AddProgressPage userId={this.state.userId} handleLogout={this.handleLogout}/>}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App

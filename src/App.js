import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'
import LoginPage from "./Pages/LoginPage/LoginPage"
import FeedPage from "./Pages/FeedPage/FeedPage"
import ProfilePage from "./Pages/ProfilePage/ProfilePage"
import AddWorkoutPage from "./Pages/AddWorkoutPage/AddWorkoutPage"
import AddProgressPage from "./Pages/AddProgressPage/AddProgressPage"

class App extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        // this.callBackendAPI()
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
    }

    callBackendAPI = async () => {
        const response = await fetch('/api/getworkouts')
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
                        <Route path='/feed' render={() => <FeedPage />}/>
                        <Route path='/profile' render={({props}) => <ProfilePage/>}/>
                        <Route path='/addworkout' render={(props) => <AddWorkoutPage/>}/>
                        <Route path='/addprogress' render={(props) => <AddProgressPage/>}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App

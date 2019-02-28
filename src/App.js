import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import LoginPage from "./Pages/LoginPage/LoginPage";
import FeedPage from "./Pages/FeedPage/FeedPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AddWorkoutPage from "./Pages/AddWorkoutPage/AddWorkoutPage";
import AddProgressPage from "./Pages/ProgressPage/AddProgressPage";

class App extends Component {
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

export default App;

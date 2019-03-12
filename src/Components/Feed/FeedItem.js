import React, {Component} from 'react';
import './FeedItem.css'
import {Link} from "react-router-dom";
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

class FeedItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.feedInfo.workout.id,
            upvotes: this.props.feedInfo.workout.likes
        }

        this.upvoteWorkout = this.upvoteWorkout.bind(this)
    }

    componentDidMount() {
        socket.on('upvote', data => {
            if(data.workoutId === this.state.id) {
                this.setState({
                    upvotes: data.upvotes
                })
            }
        })
    }

    upvoteWorkout() {

        socket.emit('upvote', {
            workoutId: this.state.id
        })
    }

    render() {
        const { user, userInfo, workout, workoutType} = this.props.feedInfo;

            return(
            <div id="feedRow" className='row no-gutters'>
                <div className='col-sm-6 leftCol'>
                    <img alt="profile" id='feedImg' src={userInfo[0].image}/>
                </div>
                <div className='col-sm-6 rightCol'>
                { workoutType.duration != null ?
                    <p id="feedDesc">{userInfo[0].name} just finished a {workoutType.duration} min {workout.type} ({workoutType.name})</p> :
                    <p id="feedDesc">{userInfo[0].name} just finished a {workout.type}.</p>
                }
                    <p>{this.state.upvotes} upvotes <input id="likeBtn" type='image' src={require('../../images/upvote.png')} onClick={this.upvoteWorkout}/></p>
                    <Link to={'/profile/' + user.id}> <button type="submit" className="btn btn-primary" id="visitProfileBtn">Visit user profile</button></Link>
                </div>
            </div>
        );


    }
}

export default FeedItem;

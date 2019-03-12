import React, {Component} from 'react';
import FeedItem from "./FeedItem";
import './Feed.css'
import Redirect from "react-router-dom/es/Redirect";
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

class Feed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            entries: [],
            redirect:false
        }
    }

    componentDidMount() {
            fetch('/api/feed')
                .then(res => res.json())
                .then(data => {
                    this.setState({entries: data.feedInfo})
                })
                .catch(error => console.log(error))

            // when something related to the feed is changed/added,
            // update the feed
            socket.on('updateFeed', () => {
                fetch('/api/feed')
                .then(res => res.json())
                .then(data => {
                    this.setState({entries: data.feedInfo})
                })
                .catch(error => console.log(error))
            })
    }


    render() {
        return (
            <div className="feed">
                <h3 id="feedtitle">Latest workouts</h3>
                {this.state.entries.map((feedInfo) => <FeedItem feedInfo={feedInfo} key={feedInfo.workout.id}/>)}
            </div>
        );
    }
}

export default Feed;

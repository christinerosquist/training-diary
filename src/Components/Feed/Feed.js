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
<<<<<<< HEAD
        this.getEntries()
    }

    getEntries() {
        fetch('/api/feed')
            .then(res => res.json())
            .then(data => {
                this.setState({entries: data.feedInfo})
=======
        fetch('/api/getCurrentUser')
            .then(res => res.json())
            .then(data => {
                if(data.user !== 'Not logged in'){
                    this.props.handleLogin(data.user.id);
                }
            })
            .catch(error => console.log(error))

            fetch('/api/feed')
                .then(res => res.json())
                .then(data => {
                    if(data.feedInfo === 'Not logged in'){
                        this.setState({redirect:true})
                    }
                    else{
                        console.log(data.feedInfo)
                        this.setState({entries: data.feedInfo})
                    }
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
>>>>>>> 48359822cdb3fe94ca3480811996bdbfc87d2355
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

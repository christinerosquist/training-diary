import React, {Component} from 'react';
import FeedItem from "./FeedItem";
import './Feed.css'
import Redirect from "react-router-dom/es/Redirect";

class Feed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            entries: [],
            redirect:false
        }
    }

    componentDidMount() {
        this.getEntries()
    }

    getEntries() {
        fetch('/api/feed')
            .then(res => res.json())
            .then(data => {
                this.setState({entries: data.feedInfo})
            })
            .catch(error => console.log(error))
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

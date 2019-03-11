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
                    this.setState({entries: data.feedInfo})
                }
            })
            .catch(error => console.log(error))
    }


    render() {
        if (this.state.redirect) {
            this.setState({redirect:false})
            return <Redirect to='/'/>;
        }
        return (
            <div className="feed">
                <h3 id="feedtitle">Latest workouts</h3>
                {this.state.entries.map((feedInfo) => <FeedItem feedInfo={feedInfo} key={feedInfo.workout.id}/>)}
            </div>
        );
    }
}

export default Feed;

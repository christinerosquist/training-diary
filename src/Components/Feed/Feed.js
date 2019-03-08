import React, {Component} from 'react';
import FeedItem from "./FeedItem";
import './Feed.css'

class Feed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            entries: []
        }
    }

    componentDidMount() {
        fetch('/api/feed')
            .then(res => res.json())
            .then(data => {
                console.log(data.feedInfo)
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

const mockData = [
    {
        user_id: 1,
        user_name: "Christina",
        img: 'https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20121488_10213062638096698_2108872499772340505_o.jpg?_nc_cat=106&_nc_ht=scontent-arn2-1.xx&oh=145eeb5b417438ecef6eae643cc135ff&oe=5D1E06AC',
        workout_type: 'group-training',
        duration: '50 min',
        likes: 5
    },
    {
        user_id: 2,
        user_name: "Klara",
        img: 'https://lh3.googleusercontent.com/a-/AAuE7mDkTSM1owLTymW_Ouhx-qoXNvctuXWUuh39kYHeRQ=s640-rw-il',
        workout_type: 'workout session',
        duration: '60 min',
        likes: 10
    }
]


export default Feed;

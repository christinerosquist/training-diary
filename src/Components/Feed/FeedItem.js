import React, {Component} from 'react';
import './FeedItem.css'

class FeedItem extends Component {

    componentDidMount() {
    }

    render() {
        const { user_name, duration, workout_type, likes} = this.props.activity;
        return (
            <div id="feedRow" className='row no-gutters'>
                <div className='col-sm-6 leftCol' align="center">
                    <img id="feedImg" src={this.props.activity.img} alt="Feed"/>
                </div>
                <div className='col-sm-6 rightCol'>
                    <p id="feedDesc">{user_name} just finished a {duration} {workout_type}.</p>
                    <p>{likes} people like this.</p>
                </div>
            </div>
        );
    }
}

export default FeedItem;

import React, {Component} from 'react';
import './FeedItem.css'
import Redirect from "../Login/Login";

class FeedItem extends Component {

    componentDidMount() {
    }



    render() {
        const { userInfo, workout, workoutType} = this.props.feedInfo;
        if(workoutType.duration != null){
            return(
                <div id="feedRow" className='row no-gutters'>
                    <div className='col-sm-6 leftCol'>
                        <img id='feedImg' src='https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20121488_10213062638096698_2108872499772340505_o.jpg?_nc_cat=106&_nc_ht=scontent-arn2-1.xx&oh=145eeb5b417438ecef6eae643cc135ff&oe=5D1E06AC'></img>
                    </div>
                    <div className='col-sm-6 rightCol'>
                        <p id="feedDesc">{userInfo[0].name} just finished a {workoutType.duration} min {workout.type} ({workoutType.name})</p>
                        <p>{workout.likes} people like this.</p>
                    </div>
                </div>

            )
        }
        else return(
            <div id="feedRow" className='row no-gutters'>
                <div className='col-sm-6 leftCol'>
                    <img id='feedImg' src='https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20121488_10213062638096698_2108872499772340505_o.jpg?_nc_cat=106&_nc_ht=scontent-arn2-1.xx&oh=145eeb5b417438ecef6eae643cc135ff&oe=5D1E06AC'></img>
                </div>
                <div className='col-sm-6 rightCol'>
                    <p id="feedDesc">{userInfo[0].name} just finished a {workout.type}.</p>
                    <p>{workout.likes} people like this.</p>
                </div>
            </div>
        );


    }
}

export default FeedItem;

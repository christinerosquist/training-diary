import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './SearchItem.css'


class SearchItem extends Component {

    render() {
        const {user, userInfo} = this.props.searchRes;
        console.log("GOT TO SEARCH ITEM")
        console.log(this.props.searchRes)
        console.log(user)
        console.log(userInfo)

            return (
                <div id="searchRow" className='row no-gutters'>
                    <div className='col-sm-6 leftCol'>
                        <img alt="profile" id='feedImg' src={userInfo.image}/>
                    </div>
                    <div className='col-sm-6 rightCol'>
                        <p id="searchDesc">{userInfo.name}</p>
                        <Link to={'/profile/' + user.id}>
                            <button type="submit" className="btn btn-primary" id="visitProfileBtn"> Visit user profile
                            </button>
                        </Link>
                    </div>
                </div>

            )
    }
}

export default SearchItem;

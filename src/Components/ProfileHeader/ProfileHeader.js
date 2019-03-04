import React, {Component} from 'react'
import './ProfileHeader.css'

class ProfileHeader extends Component {
    render() {
        return (
            <div className="row no-gutters">
                <div className="col-sm-6 col-xs-6" id="leftCol">
                    <img id="profImg" src={mockData.img} alt="Profile"/>
                </div>
                <div className="col-sm-6 col-xs-6" id="rightCol">
                    <h4>{mockData.user_name}</h4>
                </div>

            </div>
        );
    }
}

const mockData =
    {
        user_name: "Christina",
        img: 'https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20121488_10213062638096698_2108872499772340505_o.jpg?_nc_cat=106&_nc_ht=scontent-arn2-1.xx&oh=145eeb5b417438ecef6eae643cc135ff&oe=5D1E06AC',
    }

export default ProfileHeader;


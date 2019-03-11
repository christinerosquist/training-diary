import React, {Component} from 'react'
import './ProfileHeader.css'

class ProfileHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            userInfo: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        fetch('/api/getUserInfo/' + nextProps.userId)
            .then(res => res.json())
            .then(data => {
                if(data.userInfo !== 'Not logged in'){
                    this.setState({userInfo: data.userInfo[0]})
                }
            })
            .catch(error => console.log(error))

        this.setState({userId:nextProps.userId})
    }

    render() {
        return (
            <div className="row no-gutters">
                <div className="col-sm-6 col-xs-6" id="leftCol">
                    <img id="profImg" src={mockData.img} alt="Profile"/>
                </div>
                <div className="col-sm-6 col-xs-6" id="rightCol">
                    <h4>{this.state.userInfo.name}</h4>
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


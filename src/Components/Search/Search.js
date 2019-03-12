import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import SearchItem from "./SearchItem";
import './Search.css'




class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users:''
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    componentDidMount() {
        console.log("got to search")
        console.log(this.props.userId)
    }


    render() {
        console.log(this.props.location.state.searchRes)
        if(this.props.location.state.searchRes.length === 0){
            return (
                <div className="search">
                    <h3 id="searchTitle">Search result</h3>
                    <p style={{textAlign:'center'}}>No users found</p>
                </div>
            )
        }
        else {
            return (
                <div className="search">
                    <h3 id="searchTitle">Search result</h3>
                    {this.props.location.state.searchRes.map((searchRes) => <SearchItem ownProfile = {this.props.userId} searchRes={searchRes} key={searchRes.user.id}/>)}
                </div>
            );
        }
    }
}

export default withRouter(Search)

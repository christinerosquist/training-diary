import React, {Component} from 'react';
import './Header.css'
import PropTypes from 'prop-types';

class Header extends Component {
    render() {
        return (
            <div>
                <h1 id="titleHeader">Social Training Diary</h1>
            </div>
        );
    }
}

Header.propTypes = {};

export default Header;

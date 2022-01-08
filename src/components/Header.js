import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <h1>GitHüb</h1>
                <div>
                    <input type="checkbox" onClick={this.props.switch}/>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
            </div>
        )
    }
}
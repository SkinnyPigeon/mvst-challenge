import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <h1>GitHüb</h1>
                <div className='burger'>
                    <input type="checkbox" />
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                </div>
            </div>
        )
    }
}
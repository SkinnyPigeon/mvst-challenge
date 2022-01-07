import React, { Component } from 'react';

export default class Repositories extends Component {

    state = {
        display: null
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps)
        if(this.props.avatarUrl !== prevProps.avatarUrl) {
            console.log("UPDATED")
        }
    }

    render() {
        return (
            <div>
                {this.state.display}
            </div>
        )
    }
}

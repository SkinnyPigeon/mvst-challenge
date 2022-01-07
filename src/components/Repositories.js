import React, { Component } from 'react';

export default class Repositories extends Component {

    state = {
        display: null
    }

    componentDidUpdate(prevState, prevProps) {
        if(this.props.login !== prevProps.login) {
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

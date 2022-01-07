import React, { Component } from 'react';

export default class Repositories extends Component {

    state = {
        display: null,
        repoSearch: ''

    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps)
        if(this.props.avatarUrl !== prevProps.avatarUrl) {
            const toDisplay = this.generateDisplay(this.props.repos);
            this.setState({
                display: toDisplay
            })
        }
        // if(this.state.repoSearch !== prevState.repoSearch && 
        //     this.state.repoSearch.length > 3 && 
        //     this.state.display !== null) {
        //     console.log("Searching current repos")
        //     const toDisplay = this.generateDisplay([this.props.repos[0]])
        //     this.setState({
        //         display: toDisplay
        //     })
        // }
    }

    generateDisplay = (repos) => {
        return <div>
            {repos.map((data, key) => {
                return (
                    <div key={key}>
                        <p>{data.name}</p>
                    </div>
                )
            })}
        </div>
    }

    updateRepoSearch = (e) => {
        this.setState({
            repoSearch: e.target.value
        })
    }

    render() {
        return (
            <div>
                Repos
                <input onChange={this.updateRepoSearch}/>
                <button>Search for Repo</button>
                {this.state.display}
            </div>
        )
    }
}

import React, { Component } from 'react';

export default class Repositories extends Component {

    state = {
        repos: [],
        display: null,
        repoSearch: ''

    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps);
        if(this.props.avatarUrl !== prevProps.avatarUrl) {
            // const toDisplay = this.generateDisplay(this.props.repos);
            this.generateDisplay(this.props.repos);
            this.setState({
                repos: this.props.repos,
                // display: toDisplay
            });
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
        const display =  <div>
            {repos.map((data, key) => {
                return (
                    <div key={key}>
                        <p>{data.name}</p>
                    </div>
                )
            })}
        </div>
        this.setState({
            display: display
        })
    }

    updateRepoSearch = (e) => {
        this.setState({
            repoSearch: e.target.value
        });
    }

    searchRepos = () => {
        const results = []
        this.state.repos.forEach((repo) => {
            if(repo.name.indexOf(this.state.repoSearch) !== -1) {
                results.push(repo);
            }
        });
        this.generateDisplay(results);
    }

    render() {
        return (
            <div>
                Repos
                <input onChange={this.updateRepoSearch}/>
                <button onClick={this.searchRepos}>Search for Repo</button>
                {this.state.display}
            </div>
        )
    }
}

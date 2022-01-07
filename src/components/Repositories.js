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
            this.generateDisplay(this.props.repos);
            this.setState({
                repos: this.props.repos,
            });
        }
        if(this.state.repoSearch !== prevState.repoSearch && 
            this.state.repoSearch.length > 3 && 
            this.state.display !== null) {
            console.log("Searching current repos")
            this.searchRepos();
        }
        if(this.state.repoSearch !== prevState.repoSearch &&
            this.state.repoSearch.length <= 3 &&
            this.state.display !== null) {
                this.generateDisplay(this.props.repos)
            }
    }

    generateDisplay = (repos) => {
        const display =  <div>
            {repos.map((data, key) => {
                const style = data.primaryLanguage !== null ? {
                    height: "20px",
                    width: "20px",
                    borderRadius: "20px",
                    background: data.primaryLanguage.color
                } : {
                    height: "20px",
                    width: "20px",
                    borderRadius: "20px",
                    background: "#3e3e3e"
                }

                return (
                    <div key={key}>
                        <a href={data.url} target="_blank" rel="noreferrer">{data.name}</a>
                        {data.description !== null ? <p>{data.description}</p> : <p style={{opacity: "50%"}}>No description set</p>}
                        {data.primaryLanguage !== null ? <p>{data.primaryLanguage.name}</p> : <p style={{opacity: "50%"}}>Uncertain language</p>}  
                        <div style={style}></div>
                        <div className='repoBottom'></div>
                        {/* <p>Created On {new Date(data.createdAt).toDateString()}</p> */}
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
        if(results.length > 0) {
            this.generateDisplay(results);
        } else {
            this.setState({
                display: <div>
                    <p>Unable to find repository with that name. Please check spelling</p>
                </div>
            })
        }
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
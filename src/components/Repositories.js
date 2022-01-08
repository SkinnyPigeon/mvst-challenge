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
                const size = "15px";
                const style = data.primaryLanguage !== null ? {
                    height: size,
                    width: size,
                    borderRadius: size,
                    background: data.primaryLanguage.color
                } : {
                    height: size,
                    width: size,
                    borderRadius: size,
                    background: "#3e3e3e"
                }

                return (
                    <div key={key}>
                        <a href={data.url} target="_blank" rel="noreferrer">{data.name}</a>
                        {data.description !== null ? <p>{data.description}</p> : <p style={{opacity: "50%"}}>No description set</p>}
                        <div className='language'>
                            {data.primaryLanguage !== null ? <p> {data.primaryLanguage.name}</p> : <p style={{opacity: "50%"}}>Uncertain language</p>}  
                            <div style={style}></div>
                        </div>
                        <div className='repoBottom'></div>
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
            <div className='repos'>
                <input onChange={this.updateRepoSearch} placeholder='Search for repository' type="text"/>
                {this.state.display}
            </div>
        )
    }
}

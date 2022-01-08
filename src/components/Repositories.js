import React, { Component } from 'react';

export default class Repositories extends Component {

    state = {
        repos: [],
        display: null,
        repoSearch: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.avatarUrl !== prevProps.avatarUrl) {
            this.generateDisplay(this.props.repos);
            this.setState({
                repos: this.props.repos,
            });
        }
        if(this.state.repoSearch !== prevState.repoSearch && 
            this.state.repoSearch.length > 3 && 
            this.state.display !== null) {
            this.searchRepos();
        }
        if(this.state.repoSearch !== prevState.repoSearch &&
            this.state.repoSearch.length <= 3 &&
            this.state.display !== null) {
                this.generateDisplay(this.props.repos)
            }
    }

    /**
     * Generate a list of repositories and saves them to the state for displaying
     * @param {array} repos The repositories to display
     */
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
                    <div key={key} className='repoRow'>
                        <a href={data.url} target="_blank" rel="noreferrer">{data.name}</a>
                        {data.description !== null ? <p className='description'>{data.description}</p> : <p className='description' style={{opacity: "50%"}}>No description set</p>}
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

    /**
     * Updates this.state.repoSearch value
     * @param {Event} e The event triggered by text input to the search repositories input
     */
    updateRepoSearch = (e) => {
        this.setState({
            repoSearch: e.target.value
        });
    }

    /**
     * Searches current user's repositories based on the value of this.state.repoSearch.
     * 
     * The search is not triggered until there are 4 characters in the search term. If there are fewer than 4 characters or the input is deleted, the complete list of repositories is displayed.
     */
    searchRepos = () => {
        const results = []
        this.state.repos.forEach((repo) => {
            if(repo.name.toLowerCase().indexOf(this.state.repoSearch.toLowerCase()) !== -1) {
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
        const display = this.props.show ? <div className='repos'>
            <input 
                onChange={this.updateRepoSearch} 
                placeholder='Search for repository' 
                type="text" 
                spellCheck="false"
            />
            {this.state.display} 
        </div> : null;
        return (
            <div className='repos'>
                {display}
            </div>
        )
    }
}

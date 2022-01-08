import React, { Component } from 'react';

import Header from './components/Header';
import Search from './components/Search';
import Repositories from './components/Repositories';

export default class App extends Component {
  state = {
    login: "SkinnyPigeon",
    userName: '',
    avatarUrl: '',
    bio: null,
    company: null,
    location: '',
    followers: [],
    repositories: [],
    cannotFindUser: '',
    showRepos: true,
    showSearch: false
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if(e.code === 'Enter') {
        this.searchUser();
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", (e) => {
      return;
    });
  }

  /**
   * Search for user based on this.state.login
   * 
   * Defaults to SkinnyPigeon on startup.
   * 
   * Saves results to state or displays error message if user not found.
  **/
  searchUser = () => {
    this.setState({
      avatarUrl: ''
    })
    const query = `
    query {
        user (login:"${this.state.login}") {
            avatarUrl
            login
            url
            bio
            company
            location
            followers(first: 100) {
                nodes {
                    name
                    url
                }
            }
            repositories(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes {
                    name
                    description
                    url
                    primaryLanguage {
                        name
                        color
                    }
                }
            }
        }
    }`;
    fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    }).then(res => res.json())
      .then(body => {
        const user = body.data.user;
        this.setState({
          avatarUrl: user.avatarUrl,
          userName: user.login,
          bio: user.bio,
          company: user.company,
          location: user.location,
          followers: user.followers.nodes,
          repositories: user.repositories.nodes,
          cannotFindUser: '',
        });
      })
      .catch(error => {
        console.error(error);
        if (error) {
          this.setState({
            cannotFindUser: `Cannot find user with username ${this.state.login}. Please check spelling`,
            avatarUrl: '',
            userName: '',
            bio: null,
            company: null,
            location: '',
            followers: [],
            repositories: []
          })
        }
      });
  }


  /** 
   * Updates this.state.login value
   * @param {Event} e The event triggered by text input to the search user input
  **/
  updateLogin = (e) => {
    this.setState({
      login: e.target.value
    });
  }

  /**
   * Changes the view in mobile back and forth between user search and repository view
   */
  switch = () => {
    const showRepos = this.state.showRepos;
    const showSearch = this.state.showSearch;
    this.setState({
      showRepos: !showRepos,
      showSearch: !showSearch
    })
  }

  render() {
    return (
      <div>
        <Header 
          switch={this.switch}
        />
        <div className='main'>
          <Search
            searchUser={this.searchUser}
            updateLogin={this.updateLogin}
            login={this.state.login}
            userName={this.state.userName}
            avatarUrl={this.state.avatarUrl}
            bio={this.state.bio}
            company={this.state.company}
            location={this.state.location}
            followers={this.state.followers}
            repositories={this.state.repositories}
            cannotFindUser={this.state.cannotFindUser}
            show={true}
          />
          <Repositories
            repos={this.state.repositories}
            avatarUrl={this.state.avatarUrl}
            show={true}
          />
        </div>
        <div className='mobile'>
          <Search
            searchUser={this.searchUser}
            updateLogin={this.updateLogin}
            login={this.state.login}
            userName={this.state.userName}
            avatarUrl={this.state.avatarUrl}
            bio={this.state.bio}
            company={this.state.company}
            location={this.state.location}
            followers={this.state.followers}
            repositories={this.state.repositories}
            cannotFindUser={this.state.cannotFindUser}
            show={this.state.showSearch}
          />
          <Repositories
            repos={this.state.repositories}
            avatarUrl={this.state.avatarUrl}
            show={this.state.showRepos}
          />
        </div>
      </div>
    )
  }
}
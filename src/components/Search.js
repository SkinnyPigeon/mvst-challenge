import React, { Component } from 'react';
import Repositories from './Repositories';

export default class Search extends Component {
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
    }

    componentDidMount() {
        this.searchUser();
    }

    componentDidUpdate() {
        console.log(this.state);
    }

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
                        createdAt
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
            body: JSON.stringify({query}),
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
                    createdAt: user.createdAt,
                    location: user.location,
                    followers: user.followers.nodes,
                    repositories: user.repositories.nodes,
                    cannotFindUser: '',
                });
            }) 
            .catch(error => {
                console.error(error);
                if(error) {
                    this.setState({
                        cannotFindUser: `Cannot find user with username ${this.state.login}. Please check spelling`
                    })
                }
            });
    }

    updateLogin = (e) => {
        this.setState({
            login: e.target.value
        });
    }

    render() {
        const notFoundStyle = {
            color: "#3e3e3e",
            opacity: "50%"
        }
        return (
            <div className='main'>
                <div className='search'>
                    <input placeholder='Enter name of user' onChange={this.updateLogin}/>
                    <button onClick={this.searchUser}>Search for User</button>
                    <p>{this.state.cannotFindUser}</p>
                    {this.state.avatarUrl !== '' ? <img className='avatar' src={this.state.avatarUrl} alt="avatar"></img> : <div class="loader">Loading...</div>}
                    <p>{this.state.userName}</p>
                    {this.state.bio !== null ? <p>{this.state.bio}</p> : <p style={notFoundStyle}>No bio set</p>}
                    {this.state.company !== null ? <p>{this.state.company}</p> : <p style={notFoundStyle}>No company set</p>}
                    {this.state.location !== null ? <p>{this.state.location}</p> : <p style={notFoundStyle}>No location set</p>}
                </div>
                <Repositories 
                    repos={this.state.repositories}
                    avatarUrl={this.state.avatarUrl}
                />
            </div>
        )
    }
}
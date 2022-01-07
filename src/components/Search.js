import React, { Component } from 'react';
import Repositories from './Repositories';

export default class Search extends Component {
    state = {
        login: "SkinnyPigeon",
        avatarUrl: '',
        bio: null,
        company: null,
        createdAt: '',
        location: '',
        followers: [],
        repositories: []
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    searchUser = () => {
        const query = `
        query {
            user (login:"${this.state.login}") {
                avatarUrl
                login
                url
                bio
                company
                createdAt
                location
                followers(first: 100) {
                    nodes {
                        name
                        url
                    }
                }
                repositories(last: 5) {
                    nodes {
                        name
                        description
                        url
                        createdAt
                    }
                    totalCount
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
                    bio: user.bio,
                    company: user.company,
                    createdAt: user.company,
                    location: user.location,
                    followers: user.followers.nodes,
                    repositories: user.repositories.nodes
                })
            }) 
            .catch(error => console.error(error));
    }

    updateLogin = (e) => {
        this.setState({
            login: e.target.value
        })
    }

    render() {
        return (
            <div>
                Search
                <input placeholder='Enter name of user' onChange={this.updateLogin} defaultValue={"SkinnyPigeon"}/>
                <button onClick={this.searchUser}>Search for User</button>
                <Repositories 
                    repos={this.state.repositories}
                    avatarUrl={this.state.avatarUrl}
                />
            </div>
        )
    }
}
import React, { Component } from 'react';

export default class Search extends Component {
    state = {
        login: '',
        avatarUrl: '',
        bio: null,
        company: null,
        createdAt: '',
        location: '',
        followers: [],
        repositories: []
    }

    componentDidMount() {
       this.searchUser("SkinnyPigeon")
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    searchUser = (user) => {
        const query = `
        query {
            user (login:"${user}") {
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
                // console.log(body.data.user);
                const user = body.data.user;
                this.setState({
                    login: user.login,
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

    render() {
        return (
            <div>

                Search
            </div>
        )
    }
}
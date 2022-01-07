import React, { Component } from 'react';

export default class Search extends Component {
    state = {

    }

    componentDidMount() {
        const query = `
        query {
            user (login:"SkinnyPigeon") {
                avatarUrl
                login
                resourcePath
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
        }
        `
        fetch('https://api.github.com/graphql', {
            method: 'POST',
            body: JSON.stringify({query}),
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`,
            },
            }).then(res => res.text())
            .then(body => console.log(body)) 
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
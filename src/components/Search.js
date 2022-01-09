import React, { Component } from 'react';

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
        this.props.searchUser();
    }

    render() {
        const notFoundStyle = {
            color: "#3e3e3e",
            opacity: "50%"
        }
        const display = this.props.show ? <div className='search'>
            <input 
                placeholder='Enter name of user' 
                onChange={this.props.updateLogin} 
                type="text" 
                spellCheck="false"
            />
            <button onClick={this.props.searchUser}>Search for User</button>
            <p>{this.props.cannotFindUser}</p>
            {this.props.avatarUrl !== '' ? <img className='avatar' src={this.props.avatarUrl} alt="avatar"></img> : <div className="loader">Loading...</div>}
            <h3>{this.props.userName}</h3>
            {this.props.bio !== null ? <p>{this.props.bio}</p> : <p style={notFoundStyle}>No bio set</p>}
            {this.props.company !== null ? <p>{this.props.company}</p> : <p style={notFoundStyle}>No company set</p>}
            {this.props.location !== null ? <p>{this.props.location}</p> : <p style={notFoundStyle}>No location set</p>}
        </div> : null;
        return (
            <div className='search'>
                {display}
            </div>
        )
    }
}
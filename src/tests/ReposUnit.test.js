import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Repositories from '../components/Repositories';

Enzyme.configure({adapter: new Adapter()});

const repos = [
    {
        description: "Validates the rules stored on the blockchain and filters them to only the allowed ones",
        name: "db_rules",
        primaryLanguage:{
            color: "#3572A5",
            name: "Python"
        },
        url: "https://github.com/SkinnyPigeon/db_rules"
    }
]

describe('Repositories', () => {
    it('Should generate a repository display', () => {
        const wrapper = shallow(<Repositories />);
        wrapper.instance().generateDisplay(repos);
        expect(wrapper.instance().state.display.props.children.length).toEqual(1);
        expect(wrapper.instance().state.display.props.children[0].props.className).toEqual('repoRow');
    });

    it('Should be able to search for an existing repository', () => {
        const wrapper = shallow(<Repositories />);
        wrapper.instance().setState({
            repos: repos
        });
        expect(wrapper.instance().state.display).toEqual(null);
        wrapper.instance().setState({
            repoSearch: 'db_ru'
        })
        wrapper.instance().searchRepos();
        expect(wrapper.instance().state.display.props.children.length).toEqual(1);
    });

    it('Should return error message if no repository is found', () => {
        const wrapper = shallow(<Repositories />);
        wrapper.instance().setState({
            repos: repos
        });
        expect(wrapper.instance().state.display).toEqual(null);
        wrapper.instance().setState({
            repoSearch: 'abcde'
        })
        wrapper.instance().searchRepos();
        expect(wrapper.instance().state.display.props.children.props.children).toEqual('Unable to find repository with that name. Please check spelling');
    });
})


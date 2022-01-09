import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { waitFor } from '@testing-library/react';

import App from '../App';

Enzyme.configure({adapter: new Adapter()});

describe('App', () => {
    it('Should have a default login of SkinnyPigeon', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().login).toEqual("SkinnyPigeon");
    });

    it('Should be able to switch viewing mode', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().showRepos).toEqual(true);
        expect(wrapper.state().showSearch).toEqual(false);
        wrapper.instance().switch();
        expect(wrapper.state().showRepos).toEqual(false);
        expect(wrapper.state().showSearch).toEqual(true);
    });

    it.skip('Should be able to return repos for default user', async () => {
        const wrapper = shallow(<App />);
        await waitFor(() => {
            wrapper.instance().searchUser().then(() => {})
            expect(wrapper.state().repositories.length).toEqual(100);
        })
    });
})


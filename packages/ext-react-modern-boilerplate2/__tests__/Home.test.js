import React from 'react';
import { create } from 'react-test-renderer';
import Home from '../src/Home/Home';

describe('Home', () => {
    it('should render without crashing', () => {
        const result = create(<Home/>);
        expect(result).toMatchSnapshot();
    })
});
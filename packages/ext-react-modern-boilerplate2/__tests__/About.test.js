import React from 'react';
import { create } from 'react-test-renderer';
import About from '../src/About/About';

describe('About', () => {
    it('should render without crashing', () => {
        const result = create(<About/>);
        expect(result).toMatchSnapshot();
    })
});
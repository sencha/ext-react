import React from 'react';
import { create } from 'react-test-renderer';
import App from '../src/App';

describe('App', () => {
    it('should render without crashing', () => {
        const result = create(<App/>);
        expect(result).toMatchSnapshot();
    })
});

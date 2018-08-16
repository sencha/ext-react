import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { reactify } from '@extjs/reactor';
const [ Container, Button, Grid, Column, Toolbar, Panel ] = reactify('Container', 'Button', 'Grid', 'Column', 'Toolbar', 'Panel');
 
describe('ReactTestRenderer shallow snapshots', () => {
    let renderer;

    beforeEach(() => {
        renderer = new ReactShallowRenderer()
    });
    
    it('should support shallow rendering', () => {
        const TestComponent = () => (
            <Container>
                <Panel title="Child"/>
                <ChildComponent/>
            </Container>
        );

        const ChildComponent = () => (
            <Container>
                <Button text="Button"/>
            </Container>
        )

        renderer.render(<TestComponent/>);
        const result = renderer.getRenderOutput();
        expect(result).toMatchSnapshot();
    });

    it('should support child html elements', () => {
        const TestComponent = () => (
            <Container>
                <div>Foo</div>
                <ChildComponent/>
            </Container>
        );

        const ChildComponent = () => (
            <Container>
                <Button text="Button"/>
            </Container>
        )

        renderer.render(<TestComponent/>);
        const result = renderer.getRenderOutput();
        expect(result).toMatchSnapshot();
    });
});
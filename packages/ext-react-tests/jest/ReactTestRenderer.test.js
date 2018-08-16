import React from 'react';
import { create } from 'react-test-renderer'
import { reactify } from '@extjs/reactor';

const Container = reactify('Container');
const Button = reactify('Button');
const [ Grid, Column, Toolbar, Panel ] = reactify('Grid', 'Column', 'Toolbar', 'Panel');

describe('ReactTestRenderer snapshots', () => {
    
    it('should support html child elements', () => {

        const TestComponent = () => (
            <Container>
                <div className="foo" style={{color: 'red'}}>
                    <b>F</b>oo<b>b</b>ar
                </div>
                <div className="bar">Bar</div>
            </Container>
        );

        expect(create(<TestComponent/>)).toMatchSnapshot();
    });

    it('should support function props', () => {
        const TestComponent = () => (
            <Button text="Button" handler={() => console.log('clicked')}/>
        )

        expect(create(<TestComponent/>)).toMatchSnapshot();
    });

    it('should omit complex props', () => {
        const store = new Ext.data.Store({
            fields: ['name']
        });

        class Foo {

        }

        const TestComponent = () => (
            <Grid 
                title="Employees"
                store={store}
                foo = {new Foo()}
            />
        )

        expect(create(<TestComponent/>)).toMatchSnapshot();
    });

    it('should support nested ExtReact components', () => {
        const store = new Ext.data.Store({
            fields: ['name']
        });

        const TestComponent = () => (
            <Grid 
                title="Employees"
                store={store}
            >
                <Toolbar>
                    <Button text="Add Record"/>
                </Toolbar>
                <Column dataIndex="name" text="Name"/>
            </Grid>
        )

        expect(create(<TestComponent/>)).toMatchSnapshot();
    });

    it('should support ExtReact components inside html elements', () => {
        const TestComponent = () => (
            <div>
                <Container>
                    <Button text="Button"/>
                    <div>Test</div>
                </Container>
            </div>
        );

        expect(create(<TestComponent/>)).toMatchSnapshot();
    });

    it('should render composite components', () => {
        class MyComponentClass extends React.Component {
            render() {
                return (
                    <MyStatelessComponent/>
                )        
            }
        }

        function MyStatelessComponent() {
            return (
                <Panel title="MyStatelessComponent"/>
            )
        }

        function TestComponent() {
            return (
                <Container>
                    <MyComponentClass/>
                </Container>
            )
        }

        expect(create(<TestComponent/>)).toMatchSnapshot();
    });

    it('should not interfere with Components that do not use ExtReact', () => {
        class MyComponentClass extends React.Component {
            render() {
                return (
                    <MyStatelessComponent/>
                )
            }
        }

        function MyStatelessComponent() {
            return (
                <div className="inner">{null}</div>
            )
        }

        function TestComponent() {
            return (
                <div>
                    <MyComponentClass/>
                </div>
            )
        }

        expect(create(<TestComponent/>)).toMatchSnapshot();
    });

    it('should handle nested array prop values', () => {
        function TestComponent() {
            return (
                <Container data={[[1, 'One'], [2, 'Two']]}/>
            )
        }

        expect(create(<TestComponent/>)).toMatchSnapshot();
    })
});
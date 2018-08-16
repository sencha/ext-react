import React, { Component } from 'react';
import { Button, Container, List, Toolbar } from '@sencha/ext-modern';

class ListItem extends Component {
    
    componentWillUnmount() {
        document.getElementById('message').innerHTML = 'unmounted';
    }

    render() {
        return <div>{this.props.value}</div>
    }

}

export default class Unmount extends Component {

    state = { showList: true };

    store = new Ext.data.Store({
        data: [{ value: 'Test' }]
    });

    itemTpl = ({ value }) => <ListItem value={value}/>

    toggleList = () => this.setState({ showList: !this.state.showList });

    render() {
        const { showList } = this.state;

        return (
            <Container layout="fit">
                <Toolbar docked="top">
                    <Button text="Toggle List" itemId="button" handler={this.toggleList}/>
                    <div id="message"/>
                </Toolbar>
                { showList && <List store={this.store} itemTpl={this.itemTpl}/> }
            </Container>
        )
    }
    
}
import React, { Component } from 'react';
import { renderWhenReady } from '@sencha/ext-react-modern'
import { Button } from '@sencha/ext-modern'

class App extends Component {
    render() {
        return  <Button itemId="button" text="Button"/>
    }
}

const AppWhenReady = renderWhenReady(App);

export default function RenderWhenReadyTest() {
    return <AppWhenReady/>
}
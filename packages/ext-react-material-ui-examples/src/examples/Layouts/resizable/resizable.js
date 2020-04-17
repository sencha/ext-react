import React from 'react';
import { Panel, Container } from '@sencha/ext-react-modern';
import colors from '../../colors';

Ext.require('Ext.panel.Resizable');

export default function ResizableExample() {
    return (
        <Panel shadow layout="fit">
           <Panel
                title="Dock Left"
                docked="left"
                width={200}
                layout="center"
                resizable={{
                    split: true,
                    edges: 'east',
                    dynamic: true
                }}
            >
                <code>dynamic: true</code>
            </Panel>
            <Panel title="Unresizable region" flex={1}/>
            <Panel
                docked="right"
                title="Dock Right"
                width={200}
                collapsible="right"
                layout="center"
                resizable={{
                    split: true,
                    edges: 'west'
                }}
            >
                <code>collapsible</code>
            </Panel>
            <Panel
                docked="top"
                title="Dock Top"
                height={150}
                resizable={{
                    split: true,
                    edges: 'south'
                }}
            />
            <Panel
                docked="bottom"
                title="Dock Bottom"
                height={150}
                layout="center"
                resizable={{
                    split: true,
                    edges: 'north',
                    snap: 50
                }}
            >
                <code>snap: 50</code>
            </Panel>
        </Panel>
    )
}

const styles = {
    panelBody: {
        fontSize: '18px',
        color: '#777'
    }
}
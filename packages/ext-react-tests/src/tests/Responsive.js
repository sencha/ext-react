import React from 'react';

Ext.define('Ext.plugin.Foo', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.foo'
});

import { Container, Panel } from '@sencha/ext-modern';

export default function Responsive() {
    return (
        <Container>
            <Panel
                itemId="noPlugin"
                responsiveConfig={{
                    "width > 0": {
                        title: 'Title'
                    }
                }}
            />
            <Panel
                itemId="responsiveString"
                plugins="responsive"
                responsiveConfig={{
                    "width > 0": {
                        title: 'Title'
                    }
                }}
            />
            <Panel
                itemId="responsiveObject"
                plugins={{ responsive: true }}
                responsiveConfig={{
                    "width > 0": {
                        title: 'Title'
                    }
                }}
            />
            <Panel
                itemId="responsiveArray"
                plugins={[ 'responsive' ]}
                responsiveConfig={{
                    "width > 0": {
                        title: 'Title'
                    }
                }}
            />
            <Panel
                itemId="otherString"
                plugins="foo"
                responsiveConfig={{
                    "width > 0": {
                        title: 'Title'
                    }
                }}
            />
            <Panel
                itemId="otherObject"
                plugins={{ foo: true }}
                responsiveConfig={{
                    "width > 0": {
                        title: 'Title'
                    }
                }}
            />
            <Panel
                itemId="otherArray"
                plugins={[ 'foo' ]}
                responsiveConfig={{
                    "width > 0": {
                        title: 'Title'
                    }
                }}
            />
        </Container>
    )
}
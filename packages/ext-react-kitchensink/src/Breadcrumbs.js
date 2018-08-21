import React from 'react';
import { Toolbar, Button, Container } from '@sencha/ext-modern';

export default function Breadcrumbs(props) {
    let { node } = props;
    const leaf = node.isLeaf();
    const items = [];

    let premium = false;

    do {
        if (node.get('premium')) {
            premium = true;
        }

        items.unshift(
            <Button 
                text={node.get('text')} 
                key={node.get('text')}
                ui="app-breadcrumb"
                handler={navigate.bind(null, node.id)}
            />
        );
        
        if (node.parentNode) {
            items.unshift(
              <Container key={node.get('text') + '>'} >
                <div 
                    className="x-font-icon md-icon-keyboard-arrow-right" 
                    key={node.get('text') + '>'}
                    style={{ 
                        fontSize: '20px', 
                        lineHeight: '32px', 
                        verticalAlign: 'middle', 
                        color: '#666'
                    }}
                />
              </Container>
            );
        }
    } while (node = node.parentNode)

    return (
        <Toolbar {...props}>
            {items}
            { premium && leaf && (
                <div className="app-premium">Premium</div>
            )}
        </Toolbar>
    )
}

function navigate(hash) {
    location.hash = hash;
}
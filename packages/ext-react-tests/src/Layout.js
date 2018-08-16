import React from 'react';
import { Container } from '@sencha/ext-modern';

export default function Layout({ children }) {
    return (
        <Container layout="fit">
            { children }
        </Container>
    )
}
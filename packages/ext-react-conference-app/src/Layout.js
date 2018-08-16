import React, { Component } from 'react';
import { Container } from '@sencha/ext-modern';
import Menu from './Menu';
import AppBar from './AppBar';
import Search from './Search';

export default function Layout({ children }) {
    return (
        <Container layout="fit" fullscreen>
            <AppBar/>
            <Menu/>
            <Search/>
            { children }
        </Container>
    )

}

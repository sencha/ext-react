import React from 'react';
import PropTypes from 'prop-types';
import { Titlebar, Button, Container } from '@sencha/ext-react-modern';
import { connect } from 'react-redux';
import { toggleOptions } from './actions';
import EmployeesGrid from './EmployeesGrid';
import SearchOptions from './SearchOptions';
const REACT_VERSION = require('react').version
const APP_NAME = "ExtReactModern REST Example"
const SHOW_VERSION =  !Ext.os.is.Phone ? " - React v" + REACT_VERSION : " "
const APP_TITLE = APP_NAME + SHOW_VERSION

function Layout({ dispatch, showOptions }) {
    return (
        <Container viewport="true" layout="fit">
            <Titlebar title= {APP_TITLE} docked="top">
                <Button align="left" iconCls="x-fa fa-bars" handler={() => dispatch(toggleOptions())}/>
            </Titlebar>
            <SearchOptions docked="left" hidden={!showOptions}/>
            <EmployeesGrid shadow/>
        </Container>
    )
}

Layout.propTypes = {
    showOptions: PropTypes.bool
};

const mapStateToProps = (state) => {
    return { ...state }
};

export default connect(mapStateToProps)(Layout);

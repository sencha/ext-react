import React from 'react';
import PropTypes from 'prop-types';
import { TitleBar, Button, Container } from '@sencha/ext-modern';
import { connect } from 'react-redux';
import { toggleOptions } from './actions';
import EmployeesGrid from './EmployeesGrid';
import SearchOptions from './SearchOptions';
const REACT_VERSION = require('react').version
const APP_NAME = "ExtReact REST Example"
const SHOW_VERSION =  !Ext.os.is.Phone ? " - React v" + REACT_VERSION : " "
const APP_TITLE = APP_NAME + SHOW_VERSION

function Layout({ dispatch, showOptions }) {
    return (
        <Container layout="fit">
            <TitleBar title= {APP_TITLE} docked="top">
                <Button align="left" iconCls="x-fa fa-bars" handler={() => dispatch(toggleOptions())}/>
            </TitleBar>
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

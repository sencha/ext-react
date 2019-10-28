import React, { Component } from 'react';
import ExtContainer from "@sencha/ext-elements-all/react/ExtContainer";
import ExtTitlebar from "@sencha/ext-elements-all/react/ExtTitlebar";
import ExtSheet from "@sencha/ext-elements-all/react/ExtSheet";
import ExtPanel from "@sencha/ext-elements-all/react/ExtPanel";
import ExtButton from "@sencha/ext-elements-all/react/ExtButton";

//import { Container, TitleBar, Button, Sheet, Panel } from '@sencha/ext-modern';
//import { Transition} from '@sencha/ext-react-transition';

import { Switch, Route, withRouter } from 'react-router-dom'
//import { medium, large } from './responsiveFormulas';
import Home from './Home/Home';
import About from './About/About';
import NavMenu from './NavMenu';
const Ext = window.Ext;
var REACT_VERSION = require('react').version

class Layout extends Component {

    title = "Sencha ExtReact 7.0 Modern Boilerplate - React v" + REACT_VERSION

    state = {
        showAppMenu: false
    }

    toggleAppMenu = () => {
        this.setState({ showAppMenu: !this.state.showAppMenu });
    }

    onHideAppMenu = () => {
        this.setState({ showAppMenu: false });
    }

    navigate = (path) => {
        console.log('navigate')
        console.log(path)
        this.setState({ showAppMenu: false });
        this.props.history.push(path);
    }

    render() {
        const { showAppMenu } = this.state;
        const { location } = this.props;

        const navMenuDefaults = {
            onItemClick: this.navigate,
            selection: location.pathname
        }

        return (
            <ExtContainer layout="fit" viewport="true">
                <ExtTitlebar title={this.title} docked="top">
                    {Ext.platformTags.phone && (
                        <ExtButton align="left" iconCls="x-fa fa-bars" handler={this.toggleAppMenu} ripple={false}/>
                    )}
                </ExtTitlebar>
                {Ext.platformTags.phone ? (
                    <ExtSheet displayed={showAppMenu} side="left" onHide={this.onHideAppMenu}>
                        <ExtPanel scrollable title="CoolExtReactApp">
                            <NavMenu {...navMenuDefaults} width="250"/>
                        </ExtPanel>
                    </ExtSheet>
                ) : (
                    <ExtPanel scrollable docked="left" shadow zIndex={2}>
                        <NavMenu
                            {...navMenuDefaults}
                            // responsiveConfig={{
                            //     [medium]: {
                            //         micro: true,
                            //         width: 56
                            //     },
                            //     [large]: {
                            //         micro: false,
                            //         width: 200
                            //     }
                            // }}
                        />
                    </ExtPanel>
                )}
                <Switch>
                  <Route path="/" component={Home} exact/>
                  <Route path="/about" component={About}/>
                </Switch>
            </ExtContainer>
        );
    }
}

export default withRouter(Layout);
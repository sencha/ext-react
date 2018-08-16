import React, { Component } from 'react'
import { Transition, Container, TitleBar, Button, Sheet, Panel } from '@extjs/reactor/modern';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { medium, large } from './responsiveFormulas';
import Home from './Home/Home';
import About from './About/About';
import NavMenu from './NavMenu';

/**
 * The main application view and routes
 */
class Layout extends Component {

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
            <Container fullscreen layout="fit">
                <TitleBar title="React + Ext JS Modern Boilerplate" docked="top">
                    {Ext.platformTags.phone && (
                        <Button align="left" iconCls="x-fa fa-bars" handler={this.toggleAppMenu} ripple={false}/>
                    )}
                </TitleBar>
                {Ext.platformTags.phone ? (
                    <Sheet displayed={showAppMenu} side="left" onHide={this.onHideAppMenu}>
                        <Panel scrollable title="ExtReact Boilerplate">
                            <NavMenu {...navMenuDefaults} width="250"/>
                        </Panel>
                    </Sheet>
                ) : (
                    <Panel scrollable docked="left" shadow zIndex={2}>
                        <NavMenu
                            {...navMenuDefaults}
                            responsiveConfig={{
                                [medium]: {
                                    micro: true,
                                    width: 56
                                },
                                [large]: {
                                    micro: false,
                                    width: 200
                                }
                            }}
                        />
                    </Panel>
                )}
                <Transition type="fade">
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/about" component={About}/>
                    </Switch>
                </Transition>
            </Container>
        );
    }
}

export default withRouter(Layout);
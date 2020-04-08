import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Sheet, TreeList, Panel, TitleBar, Button } from '@sencha/ext-react-modern';
import { connect } from 'react-redux';
import { toggleMenu } from './actions';

Ext.require('Ext.plugin.Responsive')

class Menu extends Component {

    static propTypes = {
        onSelect: PropTypes.func
    };

    onHide = () => {
        this.props.dispatch(toggleMenu(false))
    };

    onToggleMenuClick = () => {
        this.props.dispatch(toggleMenu());
    };

    //onSelectionChange = (tree, item) => {
    onSelectionChange = ({sender, info, eOpts}) => {
        const record = info.node;
        if (record && !location.hash.startsWith('#' + record.getId())) {
            location.hash = record.getId();
        }
        else {
          //console.log('else')
        }
        //this.props.dispatch(toggleMenu(false));
    };

    render() {
        const { store, displayed, dispatch, selection, title } = this.props;

        const menu = (
            <TreeList
                ui="nav"
                store={store}
                selection={selection}

                onItemclick={this.onSelectionChange}
                expanderFirst={false}
                responsiveConfig={{
                    'width < 1080': {
                        micro: true,
                        width: 56
                    },
                    'width >= 1080': {
                        micro: false,
                        width: 225
                    },
                    'phone': {
                        micro: false,
                        width: 250
                    }
                }}
            />
        );

        if (Ext.os.is.Phone) {
            return (
                <Sheet side="left" scrollable displayed={displayed} onHide={this.onHide} padding="0">
                    <div className="app-menu-header">ExtReact Conference</div>
                    {menu}
                </Sheet>
            )
        } else {
            return (
                <Container docked="left" scrollable shadow zIndex={1} layout="vbox">
                    {menu}
                </Container>
            )
        }
    }

}

const mapStateToProps = ({ root }) => {
    return {
        store: root.navStore,
        selection: root.selectedNavNode,
        displayed: root.showMenu,
        title: root.title
    }
}

export default connect(mapStateToProps)(Menu);
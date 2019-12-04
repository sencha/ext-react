import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Titlebar, Container, Nestedlist, Panel, Button } from '@sencha/ext-react-modern'
//import { Transition } from '@sencha/ext-react-transition'


//import hljs, { highlightBlock } from 'highlightjs';
import NavTree from './NavTree';
import NavView from './NavView';
import Files from './Files';
import * as actions from './actions';
import Breadcrumbs from './Breadcrumbs';
var REACT_VERSION = require('react').version

Ext.require([
  'Ext.layout.*',
  'Ext.panel.Collapser',
  'Ext.panel.Resizer'
]);

class Layout extends Component {

  componentDidMount() {
    //console.log('componentDidMount')
    this.refs.rightContainer.cmp.updateHtml('Build: ' + BUILD_VERSION);
    if (Ext.os.is.Phone) {
      const node = this.props.selectedNavNode;
      //this.selectedNode = this.props.selectedNavNode;

      if (node) {
        /**
         * Let's go to the parent's node without animation.
         * This is so when someone hits the back button in the toolbar,
         * they are taken to the correct list they would expect.
         *
         * This likely happened when someone is deep linking into
         * the application without user interaction
         * (changing hash manually or first visiting via bookmark).
         */
        const nav = this.phoneNav.cmp;
        const anim = nav.getLayout().getAnimation();
        anim.disable();

        if(node.isLeaf()) {
            nav.goToLeaf(node);
        } else {
            nav.goToNode(node);
        }

        anim.enable();
      }

      this.phoneNav.cmp.down('titlebar').add({
        align: 'right',
        xtype: 'component',
        html: '<div class="app-premium">Premium</div>'
      })
    }
  }

// onReady={ this.extReactDidMount }
  // extReactDidMount = detail => {
  //   console.log('extReactDidMount')

  // }

  componentDidUpdate(previousProps) {
    if(Ext.os.is.Phone) {
      const node = this.props.selectedNavNode;
      const nav = this.phoneNav.cmp;

      if (node && previousProps.selectedNavNode !== node) {
        if (node.isLeaf()) {
          nav.goToLeaf(node);
        } else {
          nav.goToNode(node);
        }
      }
    }
  }

  onNavChange = (node) => {
    //console.log('onNavChange')
    //console.log(node)
    var nodeId = node.getId()
    //console.log(nodeId)
    //if(nodeId === '' || nodeId) {
      location.hash = nodeId;
      //selectedNavNode
      //this.props.selectedNavNode = node
    //}
  }

  onTitleClick = () => {
    location.hash = '/';
  }

  isPremium(node) {
    if (!node) return false;
    return node.data.premium || this.isPremium(node.parentNode);
  }

  render() {
    const {
      selectedNavNode,
      component,
      navStore,
      files,
      children,
      showCode,
      showTree,
      actions,
      layout
    } = this.props;

    const example = component && React.createElement(component);

    if (Ext.os.is.Phone) {
      // phone layout
      return (
        <Nestedlist
          ref={phoneNav => this.phoneNav = phoneNav}
          store={navStore}
          className={component && this.isPremium(selectedNavNode) ? 'app-premium-component' : ''}
          title='<i class="ext ext-sencha" style="position: relative; top: 1px; margin-right: 4px"></i> ExtReact 7.0 Kitchen Sink'
          onItemTap={(self, list, index, target, node) => this.onNavChange(node && node.getId())}
          onBack={(self, node) => {
              // There is no easy way to grab the node that will be used after NestedList switches to previous List.
              // The 'node' here will always be the 'previous' node, which means we can just strip the last /* from the
              // node's ID and use that as the new nav URL.
              this.onNavChange(node && node.getId().replace(/\/[^\/]*$/, ''))
          }}
          listConfig={{
              itemTpl: (item) => {
                  return <div>{item.text} { item.premium && <div className="x-fa fa-star app-premium-indicator"></div> }</div>
              }
          }}
          fullscreen
        >
          <Container rel="detailCard" layout="fit">
              { component && (
                  <Container key={selectedNavNode.get('text')} layout={layout} scrollable={layout==='auto'} autoSize={layout !== 'fit'}>
                      { layout === 'fit' ? example : <Container scrollable={layout==='center'}>{ example }</Container> }
                  </Container>
              ) }
          </Container>
        </Nestedlist>
      )
    } else if (!Ext.os.is.Phone) {
      // desktop + tablet layout
      //this.onNavChange(node && node.getId(), node)
      return (
        <Container layout="hbox" cls="main-background" viewport="true">
          <Container layout="fit" flex={4}>
            <Titlebar docked="top" shadow style={{zIndex: 2}}>
              <Button
                align="left"
                iconCls="x-fa fa-bars"
                handler={actions.toggleTree}
              />
              <div className="ext ext-sencha" style={{margin: '0 5px 0 7px', fontSize: '20px', width: '20px'}}/>
              <a href="#" className="app-title">Sencha ExtReact Kitchen Sink - React v{REACT_VERSION}</a>
              <Container ref="rightContainer" align="right"></Container>
            </Titlebar>
            <Container layout="fit" flex={1}>
              <NavTree
                docked="left"
                width="300"
                resizable={{
                  edges: 'east',
                  dynamic: true
                }}
                store={navStore}
                selection={selectedNavNode}
                onSelectionChange={({treelist, record, eOpts}) => {
                  //var node = detail.record
                  var node = record;
                  //console.log(node)
                  //console.log('here')
                  this.onNavChange(node)
                }}
                collapsed={!showTree}
              />
              <Breadcrumbs docked="top" node={selectedNavNode}/>

                { component
                  ? (
                    <Container layout={layout} scrollable key={selectedNavNode.id} autoSize={layout !== 'fit'}>
                      { layout === 'fit'
                        ? (<Container padding="30" layout="fit">{ example }</Container>)
                        : (example)
                      }
                    </Container>
                  )
                  : selectedNavNode
                    ? (<NavView key={selectedNavNode.id} node={selectedNavNode}/>)
                    : null
                }

            </Container>
          </Container>
          { files && (
            <Button
                align="right"
                iconCls={'x-font-icon ' + (showCode ? 'md-icon-close' : 'md-icon-code') }
                ui="fab"
                top={Ext.os.is.Desktop ? 20 : 35}
                right={21}
                zIndex={1000}
                handler={actions.toggleCode}
            />
          )}
          { files && (
            <Panel
              resizable={{ edges: 'west', dynamic: true }}
              width={700}
              layout="fit"
              collapsed={!showCode}
              header={false}
              collapsible={{ direction: 'right' }}
              shadow
              style={{zIndex: 3}}
              hideAnimation={{type: 'slideOut', direction: 'right', duration: 100, easing: 'ease' }}
              showAnimation={{type: 'slideIn', direction: 'left', duration: 100, easing: 'ease' }}
            >
              <Files files={files} />
            </Panel>
          )}
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

const mapDispatchToProps = (dispatch) => {
    const actionCreators = {};

    for (let key in actions) {
        const action = actions[key];

        if (typeof action === 'function') {
            actionCreators[key] = action;
        }
    }

    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

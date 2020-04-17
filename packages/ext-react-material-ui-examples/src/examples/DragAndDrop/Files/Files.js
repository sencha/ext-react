import React, { Component } from 'react';
import { Panel, Container } from '@sencha/ext-react-modern';
import './styles.css';

Ext.require(['Ext.drag.*']);

const DEFAULT_TEXT = 'Drag a file from your computer here';

export default class Files extends Component {


  state = {
    iconCls: 'drag-file-icon',
    //iconCls: 'drag-file-icon dropped fa-spin',
    labelText: DEFAULT_TEXT
  }

  render() {
    const {iconCls, labelText} = this.state;

    return (
      <Panel
        ref="mainPanel"
        padding={5}
        shadow
      >
        <Container ref="label" className="drag-file-label" html={labelText}></Container>
        <Container ref="icon" className={iconCls}></Container>
      </Panel>
    )
  }

    onDragEnter() {
        this.setState({
            iconCls: 'drag-file-icon active'
        });
    }

    onDragLeave() {
        this.setState({
            iconCls: 'drag-file-icon'
        });
    }

    onDrop(target, info) {
        const files = info.files;
        this.setState({
            iconCls: 'drag-file-icon dropped fa-spin',
            labelText: files.length > 1 ? `Dropped ${files.length} files.` : `Dropped ${files[0].name}`
        });

        this.timer = setTimeout(() => {
            if(!this.refs.mainPanel.destroyed) {
                this.setState({
                    iconCls: 'drag-file-icon drag-file-fadeout',
                    labelText: DEFAULT_TEXT
                });
            }

            this.timer = null;
        }, 2000);
    }

    componentDidMount() {
        this.target = new Ext.drag.Target({
            element: this.refs.mainPanel.cmp.el,
            listeners: {
                dragenter: this.onDragEnter.bind(this),
                dragleave: this.onDragLeave.bind(this),
                drop: this.onDrop.bind(this)
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        Ext.destroy(this.target);
    }
}
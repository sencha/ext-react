import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabPanel, Panel } from '@sencha/ext-modern';
import hljs, { highlightBlock } from 'highlightjs';

// JSX syntax highlighting
import 'highlightjs/styles/atom-one-dark.css';
import H_js from './H_js';
hljs.registerLanguage('js', H_js);

Ext.require('Ext.panel.Resizer');

function codeClassFor(file)  {
    if (file.endsWith('.css')) {
        return 'css';
    } else {
        return 'js xml'
    }
}

export default class Files extends Component {

    static propTypes = {
        files: PropTypes.object
    }

    componentWillMount() {
      this._refs = {};
    }

    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate(prev) {
        if (this.props.files !== prev.files) {
            this.highlightCode();
        }
    }    

    highlightCode() {
      //had to add .cmp - is there a way to avoid this??
      if (this.refs.tabs) for (let el of this.refs.tabs.cmp.el.query('.code')) {
        highlightBlock(el);
      }
    }

    render() {
        const { files } = this.props;

        return (
            <TabPanel 
                ref="tabs"
                shadow
                tabBar={{
                    layout: {
                        pack: 'left'
                    }
                }}
            >
                { Object.keys(files).map((file, i) => (
                    <Panel 
                        key={i}
                        scrollable={true}
                        title={file}
                        layout="fit"
                        ui="code-panel"
                        tab={{
                            ui: 'app-code-tab',
                            flex: 0,
                            minWidth: 120
                        }}
                        userSelectable
                        html={`<pre><code id="${file}" class="code ${codeClassFor(file)}">${files[file].replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`}
                    />
                ))}
            </TabPanel> 
        )
    }

}

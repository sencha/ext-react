import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabPanel, Panel } from '@sencha/ext-react-modern';
import hljs from 'highlightjs';
import 'highlightjs/styles/atom-one-dark.css';
Ext.require('Ext.panel.Resizer');

export default class Files extends Component {

  static propTypes = {
    files: PropTypes.object
  }

  extReactDidMount = detail => {
    this.highlightCode();
  }

  componentDidUpdate(prev) {
    if (this.props.files !== prev.files) {
      this.highlightCode();
    }
  }

  highlightCode() {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    const { files } = this.props;

    return (
      <TabPanel
        ref={(tabs) => {this.tabs = tabs}}
        onReady={this.extReactDidMount}
        shadow
        tabBar={{layout: {pack: 'left'}}}
      >
        { Object.keys(files).map((file, i) => (
          <Panel
            key={i}
            scrollable={true}
            title={file}
            layout="fit"
            ui="code-panel"
            userSelectable={{ element: true, bodyElement: true }}
            tab={{
              ui: 'app-code-tab',
              flex: 0,
              padding: "0 5 0 0",
              minWidth: 220,
              maxWidth: 250
            }}
            html={`<pre style="user-select: text;"><code id="${file}" class="code">${files[file].replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`}
          />
        ))}
      </TabPanel>
    )
  }

}

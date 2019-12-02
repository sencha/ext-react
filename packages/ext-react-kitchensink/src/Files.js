import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabPanel, Panel } from '@sencha/ext-react-modern';
// import hljs, { highlightBlock } from 'highlightjs';
// // JSX syntax highlighting
// import 'highlightjs/styles/atom-one-dark.css';
import H_js from './H_js';
// hljs.registerLanguage('js', H_js);


import hljs from 'highlight.js/lib/highlight';
//const hljs = require("highlight.js/lib/highlight");
hljs.registerLanguage(
    "javascript",
    require("highlight.js/lib/languages/javascript")
);
hljs.registerLanguage(
    "typescript",
    require("highlight.js/lib/languages/typescript")
);
hljs.registerLanguage("http", require("highlight.js/lib/languages/http"));
hljs.registerLanguage("css", require("highlight.js/lib/languages/css"));
hljs.registerLanguage("xml", require("highlight.js/lib/languages/xml"));

Ext.require('Ext.panel.Resizer');

function codeClassFor(file)  {
  return 'code'
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

  // componentWillMount() {
  //   this._refs = {};
  // }

  componentDidMount() {
    //this.highlightCode();
    //console.log('componentDidMount')
    this.highlight = true
  }

  componentDidUpdate(prev) {
    if (this.props.files !== prev.files) {
      this.hightlight = true
        //this.highlightCode();
    }
  }

  highlightCode() {
    var me = this;
    // setTimeout(function(){
    //   alert("Hello");
    //   //console.log(me.tabs)
    //   if (me.tabs) for (let el of me.tabs.cmp.el.query('.code')) {
    //     console.log(el)
    //     hljs.highlightBlock(el);
    //   }
    // }, 3000);

    // console.dir(this.tabs)
    // if (this.tabs) for (let el of this.tabs.cmp.el.query('.code')) {
    //   highlightBlock(el);
    // }
  }

  onReady() {
    //console.log('onReady')
    //console.log(this.tabs)
    //console.log(this.highlight)
    if (this.highlight) {
      // if (this.tabs) for (let el of this.tabs.cmp.el.query('.code')) {
      //   console.log(el)
      //   hljs.highlightBlock(el);
      // }

      //console.log(document.querySelectorAll("pre code"))
      document.querySelectorAll("pre code").forEach(block => {
        //console.log(block)
        hljs.highlightBlock(block);
      });
    }
  }


  render() {
    const { files } = this.props;

    return (
      <TabPanel
        ref={(tabs) => {this.tabs = tabs}}
        onReady={this.onReady.bind(this)}
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

import React from 'react'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
//import 'font-awesome/css/font-awesome.css'
import FroalaEditor from 'react-froala-wysiwyg'
import { Panel, Froalaeditor } from '@sencha/ext-react-modern'

var divStyle = {
  height: '100%',
  width: '100%',
  background: 'gray'
};

var config = {
  placeholderText: 'Froala as an ExtReact Component!'
}

{/* <Panel viewport="true" title="ExtReact with Froala Editor" layout="fit">
<div style={divStyle}>
  <FroalaEditor tag='textarea' config={config} />
</div>
</Panel> */}


export default function AppFroala() {
  return (
    <Panel viewport="true" title="ExtReact with Froala Editor" layout="fit">

        <Froalaeditor style={divStyle} tag='textarea' config={config} />

    </Panel>
  )
}

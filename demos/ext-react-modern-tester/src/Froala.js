import React from 'react'
import { ExtPanel, ExtFroalaeditor } from '@sencha/ext-react-modern'
import * as FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
window.FroalaEditor = FroalaEditor;

var placeholderText = 'Froala as an ExtReact Component!';

export default function Froala() {
  return (
    <ExtPanel viewport="true" title="ExtReact with Froala Editor" layout="fit">
        <ExtFroalaeditor value={placeholderText}/>
    </ExtPanel>
  )
}

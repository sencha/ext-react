import React from 'react'
import ExtReactDOM from '@sencha/ext-react-modern'
import AppFroala from './AppFroala'
import * as FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
window.FroalaEditor = FroalaEditor;

ExtReactDOM.render(<AppFroala/>, document.getElementById('root'));
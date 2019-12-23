import React from 'react'
import ExtReactDOM from '@sencha/ext-react-modern'
import AppFroala from './AppFroala'
import * as FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js';
window.FroalaEditor = FroalaEditor;

ExtReactDOM.render(<AppFroala/>, document.getElementById('root'));
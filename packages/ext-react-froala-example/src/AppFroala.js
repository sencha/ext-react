import React from 'react'

import { ExtPanel, ExtFroalaeditor } from '@sencha/ext-react-modern'

var placeholderText = 'Froala as an ExtReact Component!';

export default function AppFroala() {
  return (
    <ExtPanel viewport="true" title="ExtReact with Froala Editor" layout="fit">
        <ExtFroalaeditor value={placeholderText}/>
    </ExtPanel>
  )
}

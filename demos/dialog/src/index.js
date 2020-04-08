import React from 'react';
//import { reactify } from '@sencha/ext-react-modern';
import { launch } from '@sencha/ext-react-modern'
import Dialog from './Dialog';
//var ExtReact = reactify('ExtReact');
import { ExtReact } from '@sencha/ext-react-modern'

launch(() => {
    return <ExtReact><Dialog/></ExtReact>
})

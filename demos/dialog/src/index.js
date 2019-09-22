import React from 'react';
//import { reactify } from '@sencha/ext-react';
import { launch } from '@sencha/ext-react'
import Dialog from './Dialog';
//var ExtReact = reactify('ExtReact');
import { ExtReact } from '@sencha/ext-react'

launch(() => {
    return <ExtReact><Dialog/></ExtReact>
})

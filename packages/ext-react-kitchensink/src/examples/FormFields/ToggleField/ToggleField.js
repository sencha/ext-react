import React from 'react';
import { FormPanel, ToggleField } from '@sencha/ext-modern';

export default function ToggleFieldExample() {
    return (
        <FormPanel shadow defaults={{ padding: '0 10'}} padding="20">
            <ToggleField boxLabel="On" value={true}/>
            <ToggleField boxLabel="Off" value={false}/>
            <ToggleField boxLabel="Disabled" disabled />
            <ToggleField boxLabel="Disabled (On)" disabled value={true} />
        </FormPanel>
    )
}
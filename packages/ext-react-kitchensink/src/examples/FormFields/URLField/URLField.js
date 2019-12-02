import React from 'react';
import { FormPanel, URLField } from '@sencha/ext-react-modern';

Ext.require('Ext.data.validator.Url');

export default function UrlFieldExample() {
    return (
        <FormPanel shadow>
            <URLField
                placeholder="http://www.domain.com"
                label="URL"
                width="200"
                validators="url"
            />
        </FormPanel>
    )
}
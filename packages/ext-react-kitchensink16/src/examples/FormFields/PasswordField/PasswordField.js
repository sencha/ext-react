import React from 'react';
import { FormPanel, PasswordField } from '@sencha/ext-modern';

export default function PasswordFieldExample() {
    return (
        <FormPanel shadow>
            <PasswordField
                width={200} 
                label="Password" 
                required 
                revealable
            />
        </FormPanel>
    )
}
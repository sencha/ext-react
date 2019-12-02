import React, { Component } from 'react';
import { Container, Button } from '@sencha/ext-react-modern';

Ext.require('Ext.Toast');

export default function ToastExample() {
    return (
        <Button
            ui="action"
            handler={() => Ext.toast('Hello World!')}
            text="Show Toast"
        />
    )
}
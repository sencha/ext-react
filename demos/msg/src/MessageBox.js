import React, { Component } from 'react';
import { reactify } from '@sencha/ext-react-modern';
var Container = reactify('Container');
var Button = reactify('Button');
//var Dialog = reactify('Dialog');
const Ext = window.Ext;

export default class MessageBox extends Component {


    render() {

        return (
            <Container layout="fit" padding={10} fullscreen>

                    <Button handler={() =>

                    {
console.dir(Ext.Msg)

var myPanel = Ext.ComponentQuery.query('button[text="No"]');
console.log(myPanel)
                            Ext.Msg.show({
                                title: 'XXX-XX-XX',
                                listeners: {
                                    show: function(mb) {
                                        console.log('a')
                                        console.log(mb)
                                        var b = Ext.ComponentQuery.query('button[cls="mjg"]');
                                        //var b = Ext.ComponentQuery.query('#TEST_NOT_SAVE');


                                        var btn = b[0]
                                        console.dir(btn)
                                        console.log(btn.focusCls)
                                        console.log(btn.getCls())
                                        console.log(btn.setCls('x-focused'))
                                        console.log(btn.getCls())
                                        //mb.setFocus(b[0])
                                        //mb.setDefaultFocus('button[text="Not Save"]')

                                        //b[0].setFocus()
console.log(b)
                                    }
                                },
                                message: 'description',
                                icon : Ext.MessageBox.QUESTION,
                                defaultFocus: 'button[text="No"]',
                                //buttons: Ext.MessageBox.YESNOCANCEL,
                                buttons: {
                                    'SAVE' :{text: 'Save', id: 'TEST_SAVE', height: '40px', width: '50%', action: 'save'},
                                    'NOT_SAVE' :{text: 'Not Save', cls: 'mjg', id: 'TEST_NOT_SAVE', height: '40px', width: '50%'}
                               },




                                //defaultFocus: 'button',
                                fn: function(btn) {
                                    console.log(btn)
                                    if (btn === 'yes') {
                                        console.log('Yes pressed');
                                    } else if (btn === 'no') {
                                        console.log('No pressed');
                                    } else {
                                        console.log('Cancel pressed');
                                    }
                                }
                            })

                        }

                    } text="Show Message Box"/>

            </Container>
        )
    }

    showDialog = () => {
        this.setState({ showDialog: true });
    }

    onOk = () => {
        this.setState({ showDialog: false });
    }

    onCancel = () => {
        this.setState({ showDialog: false });
    }

}
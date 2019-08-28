import React, { Component } from 'react';
import { Container, Panel, Grid, Column } from '@sencha/ext-modern';

export default class AppGroupGrid extends Component {

  store = Ext.create('Ext.data.Store', {
    fields: ['ReportMonth', 'CountBackupVM', 'CountBackupWKS', 'CountBackupSRV', 'CountBackupO365'],
    data: {
        "groupData": [
            {
                "ReportMonth": "March 2019",
                "CountBackupVM": "160",
                "CountBackupWKS": "7",
                "CountBackupSRV": "0",
                "CountBackupO365": "0"
            }, {
                "ReportMonth": "February 2019",
                "CountBackupVM": "155",
                "CountBackupWKS": "7",
                "CountBackupSRV": "0",
                "CountBackupO365": "90"
            }, {
                "ReportMonth": "January 2019",
                "CountBackupVM": "156",
                "CountBackupWKS": "4",
                "CountBackupSRV": "0",
                "CountBackupO365": "89"
            }
        ]
    },
    reader: {
        type: 'json',
        rootProperty: 'groupData'
        //rootProperty: function
    }
  });

  render() {
    Ext.store = this.store

    return (
            <Container layout="fit"
                padding={10}
                fullscreen>
                <Panel title="ExtReact"
                    bodyPadding={10}
                   shadow >
                    <Grid store={this.store}>
                        <Column text="Report month"
                            dataIndex="ReportMonth"
                            flex={2}
                            resizable />
                        <Column text="VM"
                            dataIndex="CountBackupVM"
                            flex={3}
                        />
                        <Column
                            text="Workstation"
                            dataIndex="CountBackupWKS"
                            flex={2}
                            resizable />
                    </Grid>
                </Panel>
            </Container>

        )


    }


 

}
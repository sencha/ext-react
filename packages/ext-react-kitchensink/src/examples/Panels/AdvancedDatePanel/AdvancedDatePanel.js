import React, { Component } from 'react';
import { Container, DatePanel } from '@sencha/ext-react-modern';

export default class AdvancedDatePanelExample extends Component {

    render() {
        return (
            <Container padding={Ext.os.is.Phone ? 0 : 10} layout="fit">
                <DatePanel
                    shadow
                    panes={3}
                    hideCaptions={false}
                    showTodayButton
                    disabledDays={[1]}
                    disabledDates={[
                        Ext.Date.add(new Date(), Ext.Date.DAY, -1),
                        Ext.Date.add(new Date(), Ext.Date.MONTH, 1),
                        Ext.Date.add(new Date(), Ext.Date.MONTH, -1)
                    ]}
                    specialDates ={[
                        new Date(new Date().getFullYear(), 2, 19),
                        new Date(new Date().getFullYear(), 4, 1),
                        new Date(new Date().getFullYear(), 2, 16)
                    ]}
                />
            </Container>
        )
    }
}
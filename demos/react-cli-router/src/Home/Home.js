import React, { Component } from 'react';
//import { Grid, Toolbar, Column, SearchField } from '@sencha/ext-modern';
//import { Panel } from '@sencha/ext-modern';
//import { TextArea } from '@sencha/ext-modern';
import { extnameToProperty } from '@sencha/ext-elements-all/src/util.js';
import ExtGrid from "@sencha/ext-elements-all/react/ExtGrid";
import ExtToolbar from "@sencha/ext-elements-all/react/ExtToolbar";
import ExtGridcolumn from "@sencha/ext-elements-all/react/ExtGridcolumn";
import ExtSearchfield from "@sencha/ext-elements-all/react/ExtSearchfield";
//import ExtButton from "@sencha/ext-elements-all/react/ExtButton";
import data from './data';
//import { small, medium } from '../responsiveFormulas'
const Ext = window.Ext;

export default class Home extends Component {

    // data2 = [
    //     {"id":1,"name":"Debra Ortiz","email":"dortiz0@jimdo.com","phone":"(773)912-6639","hoursTaken":52,"hoursRemaining":38},
    //     {"id":2,"name":"Kevin Jackson","email":"kjackson1@fc2.com","phone":"(770)681-3608","hoursTaken":16,"hoursRemaining":60},

    // ]


    store = Ext.create('Ext.data.Store', {
        fields: ['name', 'email', 'phone', 'hoursTaken', 'hoursRemaining'],
        data
        // data: [
        //     {"id":1,"name":"Debra Ortiz","email":"dortiz0@jimdo.com","phone":"(773)912-6639","hoursTaken":52,"hoursRemaining":38},
        // ]
    });

    onReady = ({detail: {cmp, cmpObj}}) => {
        extnameToProperty(cmpObj, this);
        //exists because of extname property on searchfield
        console.log(this.searchfieldCmp)
    }

    onSearch = ({detail: {sender, oldValue, newValue}}) => {
        const query = sender.getValue().toLowerCase();
        this.store.clearFilter();
        if (query.length) this.store.filterBy(record => {
            const { name, email, phone } = record.data;
            return name.toLowerCase().indexOf(query) !== -1 ||
                   email.toLowerCase().indexOf(query) !== -1 ||
                   phone.toLowerCase().indexOf(query) !== -1;
        });
    }

    renderChange = (value, record) => (
        <div style={{height:'15px'}}>
            <ext-button text={record.data.name}></ext-button>
            <span>span - {record.data.name}</span>
        </div>
        //<ExtButton text="hi"></ExtButton>
    )

    render() {
        return (
            <ExtGrid
                onReady={this.onReady}
                store={this.store}
                columns={[
                    {text:'Name', dataIndex:'name', width: '200px'}
                ]}
            >
                <ExtToolbar docked="top">
                    <ExtSearchfield
                        extname="searchfield"
                        onChange={this.onSearch.bind(this)}
                        ui="faded"
                        ref={field => this.query = field}
                        placeholder="Search..."
                    />
                </ExtToolbar>
                <ExtGridcolumn
                    text="Name"
                    dataIndex="name"
                    flex={1}
                    renderer={this.renderChange}
                />
                {/* <ExtGridcolumn
                    text="Email"
                    dataIndex="email"
                    flex={3}
                    resizable
                /> */}
                {/* <ExtGridcolumn
                    text="Phone"
                    dataIndex="phone"
                    flex={2}
                    resizable
                /> */}
            </ExtGrid>
        )
    }
}
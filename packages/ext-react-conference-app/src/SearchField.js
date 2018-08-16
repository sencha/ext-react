import React, { Component } from 'react';
import { ComboBox } from '@sencha/ext-modern';
import { createTpl } from './schedule/EventTpl';
import { connect } from 'react-redux';
//import { toggleFavorite } from './schedule/actions';

/**
 * The search field for desktop and tablet views
 */
class SearchField extends Component {

    constructor({ store }) {
        super();

        this.store = Ext.create('Ext.data.ChainedStore', {
            source: store
        });

        this.itemTpl = createTpl({ 
            getQuery: this.getQuery, 
            showTime: true 
        })
    }

    /**
     * Needed to highlight text matching the query in the itemTpl
     */
    getQuery = () => {
        return this.query;
    }

    /**
     * Filters the combobox by event title and speaker name
     */
    search = (queryPlan) => {
        let { query } = queryPlan;
        query = (query || '').toLowerCase();

        this.query = query;
        this.store.clearFilter();
        this.store.filterBy(record => {
            const { title, speakers } = record.data;

            return query.trim().split(/\s+/).some(token => {
                return title.toLowerCase().indexOf(token) >= 0 || 
                    (speakers && speakers.some(speaker => speaker.name.toLowerCase().indexOf(token) >= 0));
            })
        });

        this.field.expand();
        return false; // cancel the built-in search and run our own
    }

    /**
     * Navigate to the event when an item is selected in the list
     */
    onSelect = (combo, record) => {
        if (record) {
            location.hash = `/schedule/${record.getId()}`
        }
    }

    render() {
        return (
            <ComboBox 
                { ...this.props }
                ui="alt"
                placeholder="Search"
                ref={field => this.field = field}
                itemTpl={this.itemTpl}
                store={this.store}
                queryMode="local"
                onBeforeQuery={this.search}
                clearable
                hideTrigger
                onSelect={this.onSelect}
                valueField='id'
                matchFieldWidth={false}
                floatedPicker={{ width: 500 }}
                triggers={{
                    search: {
                        type: 'search',
                        side: 'left'
                    },
                    expand: null
                }}
            />
        )
    }

}

const mapStateToProps = ({schedule}) => {
    return {
        store: schedule.store
    }
}

export default connect(mapStateToProps)(SearchField)
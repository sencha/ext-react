import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from '@sencha/ext-modern';
import { toggleFavorite } from './actions';
import { connect } from 'react-redux';
//import days from '../util/days';
//import { push } from 'react-router';
import { createTpl } from './EventTpl';

class ScheduleList extends Component {
    
    static propTypes = {
        dataStore: PropTypes.any.isRequired,
        onFavoriteClick: PropTypes.func,
        showTime: PropTypes.bool,
        flex: PropTypes.number,
        onSelect: PropTypes.func,
        eagerLoad: PropTypes.bool
    }

    constructor({ showTime }) {
        super();

        this.itemTpl = createTpl({ 
            getQuery: this.getQuery, 
            showTime, 
            onFavoriteClick: this.onFavoriteClick 
        });
    }

    getQuery = () => {
        return this.props.query;
    }

    onItemTap = (list, index, target, record) => {
        if (record) {
            self.location.hash = `/schedule/${record.id}`;
        }

        if (this.props.onSelect) {
            this.props.onSelect(record);
        }
    }

    onFavoriteClick = (data, e) => {
        this.props.dispatch(toggleFavorite(data.id));
    }

    listRef = list => this.list = list;

    render() {
        const { event, query, dataStore, onSelect, pinHeaders, ...listProps } = this.props;

        return (
            <List 
                ref={this.listRef}
                hideMode="offsets"
                {...listProps}
                store={dataStore}
                selection={event}
                itemTpl={this.itemTpl}
                grouped
                rowLines
                itemCls={`app-list-item ${Ext.os.is.Phone ? 'x-item-no-select' : ''}`}
                cls="app-list"
                onItemTap={this.onItemTap}
                pinHeaders={pinHeaders}
                infinite={pinHeaders}
                variableHeights={pinHeaders}
                emptyText="No events found."
            />
        )
    }

}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(ScheduleList);
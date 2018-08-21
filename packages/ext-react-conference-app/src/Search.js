import React, { Component } from 'react';
import { Toolbar, Sheet, SearchField, List, Button } from '@sencha/ext-modern';
import { connect } from 'react-redux';
import { toggleSearch, search } from './actions';
import ScheduleList from './schedule/ScheduleList';

class Search extends Component {
    
    constructor(props) {
        super();

        this.store = Ext.create('Ext.data.ChainedStore', {
            autoDestroy: true,
            source: props.store
        })
    }

    componentDidUpdate(oldProps) {
        let { query, store } = this.props;

        if (oldProps.query !== query) {
            query = query.toLowerCase();
            this.store.clearFilter();
            this.store.filterBy(record => {
                const { title, speakers } = record.data;

                return query.trim().split(/\s+/).some(token => {
                    return title.toLowerCase().indexOf(token) >= 0 || 
                        (speakers && speakers.some(speaker => speaker.name.toLowerCase().indexOf(token) >= 0));
                })
            });
        }
    }

    render() {
        const { dispatch, store, query='', showSearch } = this.props;

        return (
            <Sheet 
                height={Ext.Viewport.getHeight()} 
                layout="vbox" 
                onShow={this.onShow} 
                displayed={showSearch}
                side="bottom"
                modal={false}
                padding="0"
            >
                <Toolbar>
                    <SearchField ref={this.fieldRefHandler} flex={1} placeholder="Search" onChange={this.onSearch}/>
                    <Button text="CLOSE" handler={this.close} margin="0 0 0 10"/>
                </Toolbar>
                <ScheduleList
                    flex={1} 
                    dataStore={this.store} 
                    query={query} 
                    onSelect={this.close}
                    showTime
                    eagerLoad
                />
            </Sheet>
        )
    }

    fieldRefHandler = field => this.field = field;
    onShow = () => setTimeout(() => {
        this.field.focus();
        this.field.select();
    }, 250);
    onHide = () => this.field.blur()
    onSearch = () => this.props.dispatch(search(this.field.getValue()))
    close = () => this.props.dispatch(toggleSearch())
}

const mapStateToProps = (state) => {
    return {
        ...state.root,
        store: state.schedule.store
    };
}

export default connect(mapStateToProps)(Search);
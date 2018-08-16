import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, FieldSet, TextField, SelectField, SliderField, Container, Spacer } from '@sencha/ext-modern';
import { connect } from 'react-redux';
import { updateCriteria } from './actions';

class SearchOptions extends Component {

    static propTypes = {
        docked: PropTypes.string,
        criteria: PropTypes.object,
        hidden: PropTypes.bool
    }

    onFieldChange = Ext.Function.createBuffered(() => {
        const criteria = {};
        const { dispatch } = this.props;
        for (let name in this.refs) {
          //figure out how to fix refs so do not have to use .cmp
            criteria[name] = this.refs[name].cmp.getValue()
        }

        dispatch(updateCriteria(criteria));
    }, 250)

    render() {
        const { criteria } = this.props;

        return (
            <Panel bodyPadding={15} docked="left" width="300" layout="fit" scrollable docked={this.props.docked} hidden={this.props.hidden} shadow style={{zIndex: 10}}>
                <FieldSet title="Search Options">
                    <TextField 
                        ref="firstName"
                        style={styles.field}
                        label="First Name"
                        onChange={this.onFieldChange}
                        clearable
                    />
                    <TextField
                        ref="lastName"
                        style={styles.field}
                        label="Last Name"
                        onChange={this.onFieldChange}
                        clearable
                    />
                    <SliderField 
                        ref="age"
                        style={styles.field}
                        minValue={0} 
                        maxValue={100} 
                        values={[0, 100]} 
                        label="Age"
                        onChange={this.onFieldChange}
                        padding="5"
                    />
                    <Container layout="center" style={{paddingLeft: '5px', color: '#999'}}>
                        <div>{(criteria.age || [0, 100]).join(' - ')}</div>
                    </Container>
                    <SelectField
                        ref="gender"
                        style={styles.field}
                        label="Gender"
                        onChange={this.onFieldChange}
                        options={[
                            { text: 'All', value: null },
                            { text: 'Male', value: 'Male' },
                            { text: 'Female', value: 'Female' }
                        ]}
                    />
                </FieldSet>
            </Panel>        
        )
    }

}

const styles = {
    field: {
        marginTop: '15px'
    }
};

const mapStateToProps = (state) => {
    return { ...state }
};

export default connect(mapStateToProps)(SearchOptions);
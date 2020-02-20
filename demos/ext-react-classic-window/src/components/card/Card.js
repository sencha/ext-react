import React, {Component} from 'react';
import {ExtPanel} from '@sencha/ext-react-classic';
import Grid from '../grid/Grid';
import Form from '../form/Form';

class Card extends Component {

	//-----------------------------------
	// State
	//-----------------------------------

	state = {
		initialized: false,
		params: undefined,
		activeItem: 'card-1'
	};

	//-----------------------------------
	// React Life Cycle
	//-----------------------------------

	//-----------------------------------
	// Methods
	//-----------------------------------

	/**
	 *
	 */
	onRowDblClick = (event) => {
		this.setState({
			initialized: true,
			params: event.record.getData(),
			activeItem: 'card-2'
		});
	};

	/**
	 *
	 */
	onClose = () => {
    console.log('onClose')
		this.setState({
			initialized: false,
			params: {},
			activeItem: 'card-1'
		});
	};

	//-----------------------------------
	// View
	//-----------------------------------

	/**
	 *
	 */
	render() {
		const self = this;
		const {initialized, params, activeItem} = self.state;

		return (
			<ExtPanel
				layout = 'card'
				region = {self.props.region}
				activeItem = {activeItem}
			>
				<Grid
					itemId = 'card-1'
					onRowDblClick = {self.onRowDblClick}
				/>
				<Form
					itemId = 'card-2'
					initialized = {initialized}
					params = {params}
					onClose = {self.onClose}
				/>
			</ExtPanel>
		)
	}
}

export default Card;
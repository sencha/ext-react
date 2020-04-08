import React, { Component } from 'react';
import { Container, ToolBar, ToggleField, TimePanel } from '@sencha/ext-react-modern';

Ext.require('Ext.panel.Time');

export default class TimePanelExample extends Component {

	constructor(props) {
		super(props);

		this.state = {
            isMeridiem: true,
            isAlignPMInside: false,
        };
	}

	onMeridiemChange = (event) => {
        const value = event._value;
        this.setState({ isMeridiem: value });
    }

    onPMHoursChange = (event) => {
        const value = event._value;
        this.setState({ isAlignPMInside: value });
    }

    render() {
        return (
            <Container
            	height="100%"
				width="100%"
				layout={
					{
				      	"type": "box",
				      	"pack": "center",
				      	"align": "center"
				  	}
				}
				scrollable={true}
            >
                <ToolBar
				    docked="top"
				    ui="transparent"
				    style="align-self:center; margin-top:10px;"
			  	>
				    <ToggleField
				      	boxLabel="is Meridiem (12 hour)"
				      	name="hourformat"
				      	reference="hourformat"
				      	cls="demo-solid-background"
				      	padding="0 10"
				      	value={this.state.isMeridiem}
				      	onChange={this.onMeridiemChange}
				    >
			    	</ToggleField>
				    <ToggleField
				      	boxLabel="PM hours Inside"
				      	name="pminside"
				      	reference="hourformat"
				      	cls="demo-solid-background"
				      	padding="0 10"
				      	disabled={this.state.isMeridiem}
				      	onChange={this.onPMHoursChange}
				    >
				    </ToggleField>
			  	</ToolBar>
			  	<TimePanel
				    shadow={true}
				    alignFormatInside={false}
				    meridiem={this.state.isMeridiem}
				    alignPMInside={this.state.isAlignPMInside}
			  	>
			  	</TimePanel>
            </Container>
        )
    }
}

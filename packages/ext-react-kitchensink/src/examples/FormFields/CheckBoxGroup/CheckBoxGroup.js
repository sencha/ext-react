import React, { Component } from 'react';
import { FormPanel, Panel, Container, FieldSet, TextField, CheckBoxField, RadioField, ToolBar, Button, Label } from '@sencha/ext-modern';

export default class CheckBocGroupExample extends Component {
    render() {
        return (
            <FormPanel
			  	layout={{"type": "box", "vertical": false}}
			  	bodyPadding="10"
			  	shadow="true"
			  	maxHeight="1200"
			  	width="750"
			  	title="Checkbox Group Example"
			  	scrollable="y"
			  	bodyPadding="20"
			  	autoSize="true"
			>
				<Container
					layout={{"type": "box", "vertical": false}}
				>
					<FieldSet
						title="Individual Checkboxes"
					    defaultType="checkbox"
					    layout="form"
					    padding="0"
					    flex="1"
					>
						<TextField
							name="txt-test1"
							label="Alignment Test:"
						>
						</TextField>
						<CheckBoxField
			        		boxLabel="Dog"
			        		checked="true"
			        		label="Favorite Animals"
			        		name="fav-animal-dog"
			        		inputValue="dog"
			      		>
			      		</CheckBoxField>
			      		<CheckBoxField
					        boxLabel="Cat"
					        checked="true"
					        disabled="true"
					        name="fav-animal-cat"
					        inputValue="cat"
			      		>
			      		</CheckBoxField>
			      		<CheckBoxField
					        boxLabel="Monkey"
					        name="fav-animal-monkey"
					        inputValue="monkey"
			      		>
			      		</CheckBoxField>
		      		</FieldSet>
		      		<FieldSet
						flex="1"
			            title="Individual Radios"
			            defaultType="radio"
			            layout="form"
			            padding="0"
					>
						<TextField
							name="txt-test2"
			                label="Alignment Test:"
						>
						</TextField>
						<RadioField
						    checked="true"
			                label="Favorite Color"
			                boxLabel="Red"
			                name="fav-color"
			                inputValue="red"
						>
						</RadioField>
						<RadioField
						   checked="true"
			                disabled="true"
			                boxLabel="Blue"
			                name="fav-color"
			                inputValue="blue"
						>
						</RadioField>
						<RadioField
						    boxLabel="Green"
						    name="fav-color"
						    inputValue="green"
						>
						</RadioField>
					</FieldSet>
					<FieldSet
				      	title="Checkbox Groups"
				      	defaults='{ "labelAlign": "left", "labelWidth": "120", "margin": "10" }'
				    >
			      		<TextField
				      		name="txt-test3"
				      		label="Alignment Test 3:"
			      		>
			      		</TextField>
			      		<Panel
					        label="Auto Layout:"
					        cls="x-check-group-alt"
					        items={
					          { "label": "Item 1", "name": "cb-auto-1" },
					          { "label": "Item 2", "name": "cb-auto-2" },
					          { "label": "Item 3", "name": "cb-auto-3" },
					          { "label": "Item 4", "name": "cb-auto-4" }
					        }
			      		>
			      		</Panel>
			      		<Panel
					        label="Single Column:"
					        width="250"
					        items={
					        	{ "label": "Item 1", "name": "cb-auto-1" },
					        	{ "label": "Item 2", "name": "cb-auto-2" },
					          	{ "label": "Item 3", "name": "cb-auto-3" }
					        }
			      		>
			      		</Panel>
			      		<Panel
			      			label="Multi-Column<br />(horizontal):"
			      			cls="x-check-group-alt"
			      			items={
				                { "label": "Item 1", "name": "cb-horiz-1" },
				                { "label": "Item 2", "name": "cb-horiz-2" },
				                { "label": "Item 3", "name": "cb-horiz-3" },
				                { "label": "Item 4", "name": "cb-horiz-4" },
				                { "label": "Item 5", "name": "cb-horiz-5" },
				                { "label": "Item 6", "name": "cb-horiz-6" }
				            }
			      		>
			      		</Panel>
			      		<Panel
			      			label="Multi-Column<br />(vertical):"
			      			vertical="true"
			      			items={
				                { "label": "Item 1", "name": "cb-vert-1" },
				                { "label": "Item 2", "name": "cb-vert-2" },
				                { "label": "Item 3", "name": "cb-vert-3" },
				                { "label": "Item 4", "name": "cb-vert-4" },
				                { "label": "Item 5", "name": "cb-vert-5" },
				                { "label": "Item 6", "name": "cb-vert-6" }
				            }
			      		>
			      		</Panel>
			      		<Panel
			      			label="Multi-Column<br />(custom widths):"
			            	cls="x-check-group-alt"
			            	items={
				                { "label": "Item 1", "name": "cb-custwidth", "inputValue": "1" },
				                { "label": "Item 2", "name": "cb-custwidth", "inputValue": "2" },
				                { "label": "Item 3", "name": "cb-custwidth", "inputValue": "3" },
				                { "label": "Item 4", "name": "cb-custwidth", "inputValue": "4", "width": "100" },
				                { "label": "Item 5", "name": "cb-custwidth", "inputValue": "5", "width": "100" }
				            }
			      		>
			      		</Panel>
			      		<Panel
			                label="Multi-Column<br />(custom widths):"
			                cls="x-check-group-alt"
			                vertical="true"
			                errorTarget="side"
			                required="true"
			                defaults={
			                	{
				                  	"width": "120",
				                  	"height": "120"
				              	}
			                }
			            >
				            <Container 
			                    width="120"
			                    height="120"
			                    defaults={
			                    	{
			                      		"labelAlign": "right"
			                    	}
			                    }
			                >
			                	<CheckBoxField>
			                		<Component 
				                		html="Heading 1"
				                		padding="0 2"
				                	>
                        			</Component>
	                        		<Label
	                        			html="Item 1"
	                        			name="cb-cust-1"
	                        		>
	                        		</Label>
	                        		<Label 
	                        			html="Item 2"
	                        			name="cb-cust-2"
	                        		>
	                    			</Label>
                    			</CheckBoxField>
	                    		<CheckBoxField>
		                    		<Component
		                    			html="Heading 2"
		                    			padding="0 2"
		                    		>
			                        </Component>
			                        <Label
			                        	html="A long item just for fun"
			                        	name="cb-cust-3"
			                        >
		                        	</Label>
		                        </CheckBoxField>
		                        <CheckBoxField>
			                        <Component
			                        	html="Heading 1"
			                        	padding="0 2"
			                        >
			                        </Component>
			                        <Label
			                        	html="Item 4"
			                        	name="cb-cust-4"
			                        >
			                        </Label>
			                        <Label
			                        	html="Item 5"
			                        	name="cb-cust-5"
			                        >
			                        </Label>
			                    </CheckBoxField>
		                	</Container>
			            </Panel>
			      	</FieldSet>
				</Container>
				<ToolBar
			      	shadow="false"
			      	docked="bottom"
			      	layout={
			      		{
			        		"type": "hbox", "pack": "right"
			      		}
			      	}
			    >
			    <Button
			      	onready="formpanel.buttonReady"
			      	text="Save"
			      	margin="0 10 0 0"
			      	onTap="formpanel.toggleDisable"
			    >
			    </Button>
			    <Button
			      	text="Reset"
			      	onTap="formpanel.resetForm"
			    >
			    </Button>
			  </ToolBar>
            </FormPanel>
        )
    }
}
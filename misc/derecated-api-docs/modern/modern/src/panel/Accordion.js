/**
 * @class Ext.panel.Accordion
 * @extend Ext.Panel
 * @xtype accordion
 * @mixin Ext.mixin.Bufferable
 * This container manages child panels in an expandable accordion style. By default, only
 * one child panel can be expanded at a time. Set {@link #openable} to a different value
 * to allow multiple panels to be expanded.
 *
 * Note: Only `Ext.Panel` and its subclasses will be explicitly managed. All other items
 * will be treated normally.
 *
 *	@example packages=[ext-react]
 *	import React, { Component } from 'react'
 *	import { Accordion, Panel } from '@sencha/ext-modern';
 *
 *	export default class MyExample extends Component {
 *	   render() {
 *	       return (
 *	            <Accordion 
 *	                title="Accordion"
 *	                fullscreen="true"
 *	                openable="2"
 *	            >
 *	                <Panel
 *	                    bodyPadding="10"
 *	                    title="Panel 1"
 *	                    html="Panel Content!"
 *	                >
 *	                </Panel>
 *	                <Panel
 *	                    bodyPadding="10"
 *	                    title="Panel 2"
 *	                    html="Panel Content!"
 *	                >
 *	                </Panel>
 *	                <Panel
 *	                    bodyPadding="10"
 *	                    title="Panel 3"
 *	                    html="Panel Content!"
 * 	                >
 *	                </Panel>
 *	           </Accordion>
 *	        )
 *	    }
 *	}
 * @since 7.0
 */

 /**
  * @cfg {String} defaultPanelUI
  * The default {@link Ext.Widget#cfg!ui ui} to assign to collapsible panels.
  */

 /**
  * @cfg {Boolean} expandedFirst
  * Set to `true` to move a panel to the first position in the container when it
  * is expanded.
  */

 /**
  * @cfg {Number} openable
  * Limits the number simultaneously expanded (open) child panels.
  */

/**
 * @class Ext.field.Search
 * @extend Ext.field.Text
 * @xtype searchfield
 *
 * The Search field creates an HTML5 search input and is usually created inside a form. Because it creates an HTML
 * search input type, the visual styling of this input is slightly different to normal text input controls (the corners
 * are rounded), though the virtual keyboard displayed by the operating system is the standard keyboard control.
 *
 * As with all other form fields, the search field gains a "clear" button that appears whenever there
 * is text entered into the form, and which removes that text when tapped.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, FormPanel, SearchField } from '@sencha/ext-react-modern'
 *
 *     export default class SearchFieldExample extends Component {
 *
 *         state = { };
 *
 *         search = (field, value) => {
 *             this.setState({ query: value });
 *         }
 *
 *         render() {
 *             const { query } = this.state;
 *
 *             return (
 *                 <ExtReact>
 *                     <Container layout="center">
 *                         <FormPanel shadow>
 *                             <SearchField
 *                                 value={query}
 *                                 width="300"
 *                                 placeholder="Search..."
 *                                 onChange={this.search}
 *                             />
 *                             { query && <div>You searched for "{query}"</div> }
 *                         </FormPanel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *
 *     }
 *
 * Because search field inherits from {@link Ext.field.Text textfield} it gains all of the functionality that text
 * fields provide, including getting and setting the value at runtime, validations and various events that are fired
 * as the user interacts with the component. Check out the {@link Ext.field.Text} docs to see the additional
 * functionality available.
 */

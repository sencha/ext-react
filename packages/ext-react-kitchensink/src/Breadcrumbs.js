import React, {Component} from 'react';
import { BreadcrumbBar } from '@sencha/ext-modern';
import root from './examples/index';

export default class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.store = Ext.create('Ext.data.TreeStore', {
            rootVisible: true,
            root: root
        });
    }

    componentDidMount() {
        this.refs.appBreadcrumb.cmp.setSelection(this.props.node);
    }

    componentWillUpdate(newProps) {
        if (newProps.node.id !== this.props.node.id) {
            this.refs.appBreadcrumb.cmp.setSelection(newProps.node);
        }
    }

    onPathChange = (context, node) => {
        location.hash = node.id;
    }

    render() {
        return (
            <BreadcrumbBar
                docked="top"
                showIcons= "true"
                store={this.store}
                onChange={this.onPathChange}
                ref="appBreadcrumb"
                useSplitButtons
            >
            </BreadcrumbBar>
        )
    }
}
import React, { Component } from "react";
import { TabPanel, Container, Tree } from "@sencha/ext-react-modern";
//import { Tree } from '@sencha/ext-react-modern';
import store from "./Store";

export default class TreeDecorationsExample extends Component {
    defaults = {
        rootVisible: false,
        shadow: true,
        store: store
    };

    render() {
        return (
            <TabPanel>
                <Container layout="fit" title="Row Lines">
                    <Tree {...this.defaults} header={false} rowLines />
                </Container>
                <Container layout="fit" title="Single Expand">
                    <Tree {...this.defaults} header={false} singleExpand />
                </Container>
            </TabPanel>
        );
    }
}

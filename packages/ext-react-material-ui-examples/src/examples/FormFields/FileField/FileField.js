import React, { Component } from 'react';
import { Container, Panel, FileField } from '@sencha/ext-react-modern'

export default class SearchFieldExample extends Component {

    state = { };

    onChange = (field, value) => {
        this.setState({ file: value });
    }

    render() {
        const { file } = this.state;

        return (
            <Panel shadow height="200" width="400" bodyPadding="20" layout="vbox">
                <FileField
                    label="Attachment"
                    value={file}
                    onChange={this.onChange}
                />
                { file && <div>You selected {file}</div> }
            </Panel>
        )
    }

}

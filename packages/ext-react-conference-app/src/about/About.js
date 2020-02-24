import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../actions';
import { Container } from '@sencha/ext-react-modern';

class About extends Component {

  componentDidMount() {
    this.props.dispatch(setTitle('About'));
  }

  render() {
    const listStyle = {
      padding: '0 0 5px 0'
    };

    return (
      <Container>
        <div style={{padding: Ext.os.is.Phone ? '0 10px': '0 20px'}}>
            <h2 style={{fontWeight: 100}}>ExtReact Conference App</h2>
            <div>
                This app is built with <a href="https://github.com/sencha/ext-react">Sencha ExtReact 7.2</a> and uses the following libraries:
                <ul style={{listStyle: 'none', padding: '0'}}>
                    <li style={listStyle}><a href="https://facebook.github.io/react/">React 16.12.0</a></li>
                    <li style={listStyle}><a href="http://redux.js.org/">React Redux 7.2.0</a></li>
                    <li style={listStyle}><a href="http://redux.js.org/">React Router Redux 5.0.0-alpha.6</a></li>
                </ul>
            </div>
            <p>
                The source code for this app is available <a href="https://github.com/sencha/ext-react/tree/ext-react-7.2.x/packages/ext-react-conference-app">here</a>.
            </p>
        </div>
      </Container>
    )
  }

};

const mapStateToProps = (state) => {
  return { };
}

export default connect(mapStateToProps)(About);
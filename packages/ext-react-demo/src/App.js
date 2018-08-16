import React, { Component } from 'react'

//const Container = reactify('Container')
//import {reactify} from '@sencha/ext-react'
import { Container } from '@sencha/ext-modern'

export default class App extends Component {
  render() {
    return (
      <Container layout={{ type: 'vbox', align: 'stretch' }} padding={10}>
hi123
      </Container>
    )
  }
}
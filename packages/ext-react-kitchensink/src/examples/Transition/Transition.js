import React, { Component } from 'react'
import { Spacer, Panel, Button, Menu, MenuItem, Container, SliderField } from '@sencha/ext-react-modern'
//import { Transition } from '@sencha/ext-react-transition'
import colors from '../colors'

export default class TransitionExample extends Component {

  state = {
      index: 1,
      type: 'slide',
      easing: 'Ease',
      duration: 350,
      direction: 'forward'
  }

  setType = (item) => {
      this.setState({ type: item.getText() })
  }

  setEasing = (item) => {
      this.setState({ easing: item.getText() })
  }

  setDuration = (field) => {
      this.setState({ duration: field.getValue() })
  }

  goForward = () => {
      this.setState({ direction: 'left', index: this.state.index + 1 })
  }

  goBack = () => {
      this.setState({ direction: 'right', index: this.state.index - 1 })
  }

  setDuration = (field) => {
      this.setState({ duration: field.getValue()[0] })
  }

  render() {
    const { index, type, direction, easing, duration } = this.state;

    const styles = [
        colors.card.blue,
        colors.card.red,
        colors.card.green
    ];

    return (
      <Container layout="vbox" padding="10">
        <Panel ui="instructions" shadow>
          <div>
            Use <b>Transition</b> to animate swapping one component for another.  This is especially useful when
            combined with <b>react-router</b> to animation transitions between routes.
          </div>
        </Panel>

        <Container layout="hbox" defaults={{ margin: '0 10 0 0' }} margin="20 0">
          <Button iconCls="x-fa fa-chevron-left" handler={this.goBack} ui="action raised" margin="0 5 0 0"/>
          <Button iconCls="x-fa fa-chevron-right" handler={this.goForward} ui="action raised"/>
          <Spacer/>
          <Button text={Ext.String.capitalize(type)} ui="action raised">
            <Menu indented={false}>
              <MenuItem text="Slide" handler={this.setType}/>
              <MenuItem text="Cover" handler={this.setType}/>
              <MenuItem text="Reveal" handler={this.setType}/>
              <MenuItem text="Pop" handler={this.setType}/>
              <MenuItem text="Fade" handler={this.setType}/>
            </Menu>
          </Button>
          <Button text={Ext.String.capitalize(easing)} ui="action raised">
            <Menu indented={false}>
              <MenuItem text="Linear" handler={this.setEasing}/>
              <MenuItem text="Ease" handler={this.setEasing}/>
              <MenuItem text="Ease-In" handler={this.setEasing}/>
              <MenuItem text="Ease-Out" handler={this.setEasing}/>
              <MenuItem text="Ease-In-Out" handler={this.setEasing}/>
            </Menu>
          </Button>
          <SliderField value={duration} maxWidth={200} flex={1} minValue={100} maxValue={1000} step={100} onChange={this.setDuration}/>
          <Container style={{lineHeight: '32px', fontSize: '16px'}}><div>{duration.toString()}ms</div></Container>
        </Container>

        <Panel flex={1} layout="fit" shadow>
          {/* <Transition direction={direction} type={type.toLowerCase()} easing={easing} duration={duration}>
            <Container key={`card${index}`} layout="center" style={styles[Math.abs(index) % 3]}>
              <div>View {index}</div>
            </Container>
          </Transition> */}
        </Panel>
      </Container>
    )
  }
}

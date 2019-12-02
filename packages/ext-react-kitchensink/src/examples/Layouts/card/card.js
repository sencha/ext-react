import React, { Component } from 'react';
import { Container, Panel, Button } from '@sencha/ext-react-modern';
import colors from '../../colors';

export default class CardLayoutExample extends Component {

    state = {
        activeCard: 0
    }

    switchCards(animation) {
        this.setState({ activeCard: this.state.activeCard === 0 ? 1 : 0, animation });
    }

    createCardContents(ui) {
        const animationDefaults = {
            duration: 500,
            easing: 'ease-in-out'
        };

        const contents = [
            { text: 'Slide Left', animation: { type: 'slide', direction: 'left', ...animationDefaults } },
            { text: 'Slide Right', animation: { type: 'slide', direction: 'right', ...animationDefaults } },
            { text: 'Slide Up', animation: { type: 'slide', direction: 'up', ...animationDefaults } },
            { text: 'Slide Down', margin: '0 0 20 0', animation: { type: 'slide', direction: 'down', ...animationDefaults } },
            { text: 'Cover Left', animation: { type: 'cover', direction: 'left', ...animationDefaults } },
            { text: 'Cover Right', animation: { type: 'cover', direction: 'right', ...animationDefaults } },
            { text: 'Cover Up', animation: { type: 'cover', direction: 'up', ...animationDefaults } },
            { text: 'Cover Down', margin: '0 0 20 0', animation: { type: 'cover', direction: 'down', ...animationDefaults } },
            { text: 'Reveal Left', animation: { type: 'reveal', direction: 'left', ...animationDefaults } },
            { text: 'Reveal Right', animation: { type: 'reveal', direction: 'right', ...animationDefaults } },
            { text: 'Reveal Up', animation: { type: 'reveal', direction: 'up', ...animationDefaults } },
            { text: 'Reveal Down', margin: '0 0 20 0', animation: { type: 'reveal', direction: 'down', ...animationDefaults } },
            { text: 'Fade', animation: { type: 'fade', ...animationDefaults } },
            { text: 'Pop', animation: { type: 'pop', ...animationDefaults } },
            { text: 'Flip', animation: { type: 'flip', ...animationDefaults } }
        ].map(({animation, ...props}, i) => <Button { ...props } key={i} ui={ui} onTap={this.switchCards.bind(this, animation)}/>);

        return (
            <Container layout={{ type: 'vbox', pack: 'center'}}>
                {contents}
            </Container>
        )
    }

    render() {
        const { animation, activeCard } = this.state;

        const body = (
            <Container
                layout={{ type: 'card', animation }}
                activeItem={this.state.activeCard}
                flex={1}
                shadow
                defaults={{
                    scrollable: 'y'
                }}
            >
                <Panel bodyStyle={colors.card.blue} shadow>
                    {this.createCardContents('alt')}
                </Panel>
                <Panel bodyStyle={colors.card.green} shadow>
                    {this.createCardContents('alt')}
                </Panel>
            </Container>
        )

        return (
            <Container layout="vbox" padding="10">
                <Panel shadow ui="instructions" margin="0 0 20 0">
                    <div>
                        A <b>card</b> layout shows one item at a time.  Each item takes on the full height and width of the container.
                        Card layouts can optionally be configured to animate when switching cards.
                    </div>
                </Panel>
                { body }
            </Container>
        )
    }

}

import React from 'react';
import { Carousel, Container } from '@sencha/ext-react-modern';

const styles = {
  card: {
      fontSize: '18px'
  },
  cardLight: {
      backgroundColor: 'white',
  },
  cardDark: {
      backgroundColor: '#303030',
      color: 'white'
  },
  code: {
      color: '#859900'
  }
};

const cardProps = {
  flex: 1,
  height: '100%',
  style: { ...styles.cardLight, ...styles.card },
  layout: {
      type: 'vbox',
      align: 'center',
      pack: 'center'
  }
};

const rootProps = { align: 'stretch', type: 'vbox' };


export default function CarouselExample() {
  return (
    <Container layout={{...rootProps}} padding={10}>
      <Carousel flex={1} shadow>
        <Container {...cardProps}>
          <div>Swipe left to show the next card...</div>
        </Container>
        <Container {...cardProps}>
          <div>You can also tap on either side of the indicators.</div>
        </Container>
        <Container {...cardProps}>
          <div>Card #3</div>
        </Container>
      </Carousel>
      <Carousel ui="light" direction="vertical" flex={1} shadow margin="20 0 0 0">
        <Container {...cardProps} style={{...styles.cardDark, ...styles.card}}>
          <div>Carousels can also be vertical <em>(swipe up)...</em></div>
        </Container>
        <Container {...cardProps} style={{...styles.cardDark, ...styles.card}}>
          <div>And can also use <code style={styles.code}>ui:light</code>.</div>
        </Container>
        <Container {...cardProps} style={{...styles.cardDark, ...styles.card}}>
          <div>Card #3</div>
        </Container>
      </Carousel>
    </Container>
  )
}

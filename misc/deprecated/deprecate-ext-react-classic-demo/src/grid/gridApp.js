import React, { Component } from 'react'
import { ExtReact, Panel, FieldSet, Container, Button } from '@sencha/ext-classic';
export default class gridApp extends Component {
  render() {
    return (


    <Container layout="fit" padding={10} fullscreen>
      <Panel title="ExtReact" bodyPadding={10} shadow>
      <FieldSet title={"HTML inside - not working"}>
      <Panel height={80} border={true} title={"HTML inside"}>
          <div>
              html inside <strong>Panel</strong>
              <Panel title="ExtReact" bodyPadding={10} shadow></Panel>
          </div>
      </Panel>
      </FieldSet>

      </Panel>
  </Container>




    )
  }



}


// <FieldSet title={"HTML inside - not working"}>
// <Panel height={80} border={true} title={"HTML inside"}>
//     <div>
//         html inside <strong>Panel</strong>
//     </div>
// </Panel>
// <Container height={40} margin={"5 0"} border={true} style={{border: "1px solid red"}}>
//     <div>
//         html inside <strong>Container</strong>
//         <Button text="btn inside div"/>
//     </div>
// </Container>
// </FieldSet>

// <FieldSet title={"String inside"}>
// <Panel height={80} border={true} title={"simple TEXT inside"}>
//     simple text inside Panel
// </Panel>
// <Container height={40} margin={"5 0"} border={true} style={{border: "1px solid green"}}>
//     simple text inside Container
//     <Button text="btn inside Container"/>
// </Container>
// </FieldSet>



// <Panel title='ExtReact Classic Demo'>
// <div>first div</div>
// <div>second div</div>
// <div style={{padding:'10px'}}>
//   <div>nested div with padding</div>
// </div>
// </Panel>
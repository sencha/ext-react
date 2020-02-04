/**
 * @since 6.6.0
 *
 * Example usage:
 *
 *      @example
 *      import React, { Component } from 'react';
 *      import { ExtReact, SliderField, Gauge, FormPanel, Container} from '@sencha/ext-react-modern';
 *      Ext.require('Ext.ux.gauge.needle.Spike');
 *      export default class NeedleExample extends Component {
 *          constructor() {
 *              super();
 *              this.state = {
 *                  value: 30
 *              }
 *          }
 *          updateGauges(slider, value) {
 *              this.setState({ value })
 *          }
 *          render() {
 *              const { value } = this.state;
 *              return (
 *                  <ExtReact>
 *                      <FormPanel shadow layout="vbox" width={850}>
 *                          <SliderField label="Value" width={350} onChange={this.updateGauges.bind(this)} value={value}/>
 *                          <Container
 *                              layout={{
 *                                  type: 'hbox',
 *                                  align: 'stretch'
 *                              }}
 *                              margin={'10 0 10 0'} flex={1}
 *                              width={'100%'}
 *                              minHeight={200}
 *                          >
 *                           <Gauge flex={1} value={value} needle={'spike'}/>
 *                          </Container>
 *                      </FormPanel>
 *                  </ExtReact>
 *              )
 *          }
 *      }
 */
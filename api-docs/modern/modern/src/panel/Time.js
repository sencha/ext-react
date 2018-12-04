/**
 * This component presents a time selection view with different interaction modes
 * depending on the device and configuration options. Default time view is analog
 * clock face.
 *
 * Time panel is mostly used as a picker by {@link Ext.field.Time} but can also be
 * created and used directly.
 *
 * @since 6.6.0
 *
 * Example usage:
 *
 *      @example packages=[reactor]
 *      import { ExtReact, Container, TimePanel } from '@extjs/ext-react';
 *      import React, { Component } from 'react';
 *      export default class TimeExample extends Component {
 *          render() {
 *              return (
 *                  <ExtReact>
 *                      <Container padding={10} layout={'auto'}>
 *                          <TimePanel shadow/>
 *                      </Container>
 *                  </ExtReact>
 *              )
 *          }
 *      }
 */
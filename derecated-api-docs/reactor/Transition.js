/**
 * @class Ext.reactor.Transition
 * @extends Ext.Container
 * @xtype transition
 *
 * Animates the creation and destruction of child elements.  This component is especially useful for animating
 * transitions between routes with react-router. Child elements should be given unique keys to ensure they are properly
 * replaced (and not merely updated) when changes occur.
 *
 * Here is an example of how to use Transition with react-router to create a slide effect when changing routes:
 *
 *
 *      import React from 'react';
 *      import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
 *      import { ExtReact, Transition } from '@sencha/ext-react-modern';
 *      import NewsFeed from './NewsFeed';
 *      import Article from './Article';
 *
 *      function Layout() {
 *          return (
 *              <ExtReact>
 *                  <Transition>
 *                      <Switch>
 *                          <Route path="/articles" component={NewsFeed}/>
 *                          <Route path="/articles/:id" component={Article}/>
 *                      </Switch>
 *                  </Transition>
 *              </ExtReact>
 *          )
 *      }
 *
 */

/**
 * @cfg {String} [type="slide"]
 * @accessor
 * The type of animation to use. Can be "slide", "reveal", "cover", "fade", or "pop".
 */

/**
 * @cfg {Number} [duration=350]
 * @accessor
 * The duration of animations in milliseconds
 */

/**
 * @cfg {String} [easing="ease"]
 * @accessor
 * The easing function to use for animations. Valid values are 'ease', 'linear', ease-in', 'ease-out', 'ease-in-out', or a cubic-bezier curve as defined by CSS.
 */

/**
 * @cfg {String} [direction="left"]
 * @accessor
 * The direction of the forward animation.
 */

/**
 * @cfg {Boolean} [bindDirectionToLocation=true]
 * @accessor
 * Automatically switch directions based on browser URL changes. This should generally
 * be set to true when animating transitions based on client-side routing. Defaults to true.
 */

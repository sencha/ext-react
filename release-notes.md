# Release Notes

## v7.0.0

* Support for React 16.8.x
* Support for Ext JS Components v7.0
* Improved support for renderer function of grid cell
* Common @sencha/ext-webpack-plugin npm package


## v6.6.4

* Support for React 16.6.3
* Support for Lerna  3.6.0

## v6.6.3

* Support for React 16.6.0
* Support for common plugin across ExtJS, ExtReact and ExtAngular

## v6.6.2

* Support for React 16.5.2
* Simplified default build output
* added 'verbose' parameter ext-webpack-plugin option
* refactored ext-webpack-plugin for reuse with ExtAngular and Open Tooling
* added 'framework' parameter ext-webpack-plugin option
* eliminated need for 'copy-webpack-plugin'
* added more robust checking for valid ext-webpack-plugin parameters
* addressed issue for 'renderwhenready' for classic toolkit
* added defaults for profile, environment and verbose to package.json
* utilize 'env.' variables in package.json
* fixed issue with compress of bundles for production builds
* added 'emit' parameter ext-webpack option
* added 'browser' parameter ext-webpack option

## v6.6.1

* Support for React 16.5
* Support for Babel 7

## v6.6.0

* Support for React 16
* Support for Webpack 4
* Support for components from Ext JS 6.6
* Use of npm packages from Ext JS 6.6
* Removal or extjs-reactor name - everything now is ext-react
* Alignment of ExtReact to version of Ext JS - version 6.6
* Removed Yeoman requirement for ext-react-gen

## v1.1.2

No changes.

## v1.1.1

This release contains the following bug fixes:

* Function props are now properly rebound when updated during rendering. This fixes the issue posted [here in the ExtReact forum](http://www.sencha.com/forum/showthread.php?368632).
* Bug: "Variable isDelete undefined in ExtJSComponent#_mergeConfig." This caused an error when attempting to add or remove columns from a grid when rerendering.
* Bug: "TypeError: Object doesn't support property or method 'forEach' at Anonymous function". This error would show up in the debugger when using ExtReact in Edge or Internet Explorer.

Of these changes, the first has the most potential to impact existing code. ExtReact previously ignored updates to props whose values are functions (typically event handlers) when rerendering. While defining event handler functions inside of the render function is generally discouraged in react, it is still supported. 

Here is an example that illustrates the bug: 

```javascript
class Counter extends Component {
    state = { count: 0 };

    render() {
        const count = this.state.count

        return (
            <div>
                <p>{count}</p>
                <Button text="Go" handler={() => {
                    this.setState({count: count + 1})
                }}/>
            </div>
        )
    }
}
```

In this example, clicking the button should increment the displayed count each time. Each time render is called, the button's handler function should be updated. This was not the case in reactor 1.1.0. The count would get stuck at 1 due to the handler function not being updated. This is fixed in reactor 1.1.1.

This fix may cause your app to behave differently if it relies on handler functions not being updated during rerendering. Fixing this bug actually exposed a few issues in the ExtReact KitchenSink, which we've also fixed. We suggest you review your code to see if it inadvertently relies on this behavior. We also suggest defining handler functions using ES7 property initializers instead of defining them in the render function. For example, the example would be better written as:

```javascript
class Counter extends Component {
    state = {count: 0};

    incrementCount = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        const count = this.state.count

        return (
            <div>
                <p>{count}</p>
                <Button text="Go" handler={this.incrementCount} />
            </div>
        )
    }
}
```

Finally, while reactor-webpack-plugin and reactor-babel-plugin have been updated to version 1.1.1 as well, no changes were made. We aim to keep the version numbers in sync for all reactor packages to avoid confusion about compatibility.

## v1.1.0

### reactor

* You can now render React components inside Grid cells using the `Column` component's `renderer` prop or the new `RendererCell` component. 
* The responsive plugin is automatically added to any ExtReact component with a `responsiveConfig` prop.
* The `launch` function now passes the viewport DOM element as a parameter to the callback function.  This makes it easier to use react-hot-loader.  See updated reactor-boilerplate for an example of this in action.
* New `renderWhenReady` higher-order component makes it easier to build libraries based on ExtReact.  When root ExtReact components are wrapped in `renderWhenReady`, the launch function is not needed as long as your app does not set the `fullscreen` prop to `true` on any components.
* Added support for react-test-renderer and jest. Boilerplate projects now use jest for the npm test script.
* You can now use component names in selectors when using Sencha Test
* Fixed a bug that caused new children added to the first position in an existing container to be rendered in the wrong position.
* Fixed a bug that prevented updates to the `className` prop from being applied to the DOM.
* Fixed a bug that caused incorrect component names to be rendered in React dev tools' virtual DOM view.
* Fixed a bug that prevented componentWillUnmount from being called on children of ExtReact components
* Fixed a bug that prevented componentWillUnmount from being called on components rendered by `tpl` prop callbacks


### reactor-webpack-plugin

* New `treeShaking` options allows you to disable tree shaking in development builds to improve build times.  When `treeShaking` is set to false, all ExtReact components are included in the build.

### generator-ext-react (Yeoman Generator)

* Typescript is now supported
* Jest is now supported when using JavaScript
* react-hot loader is now supported when using JavaScript
* You can omit example code to create a minimal starter app.
* Fixed a bug that prevented new projects from being created when `yo` is not installed globally
* The generated README.md is now customized based on yeoman input parameters.

### reactor-kitchensink

* Added more examples of the `Panel` component
* Added an example of a multi-step Wizard.
* All grid examples have been updated to use Column's `renderer` prop and `RendererCell` where applicable.

### Boilerplates

* Added react-hot-loader to reactor-boilerplate and reactor-modern-boilerplate
* All boilerplates now automatically find an open port starting with 8080.
* npm "prod" script now uses static-server instead of webpack-dev-server.
